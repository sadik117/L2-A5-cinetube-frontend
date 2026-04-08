"use client";

import { useEffect, useState } from "react";
import { getUsersActivity } from "@/services/admin.api";
import { toast } from "sonner";
import {
  User,
  Calendar,
  MessageSquare,
  List,
  Star,
  Activity,
  Search,
  Filter,
  ChevronDown,
  RefreshCw,
  Eye,
  Mail,
  CalendarDays,
  BarChart3,
  Users,
  ArrowUpDown,
  X,
} from "lucide-react";
import Link from "next/link";
import { UserActivity } from "@/lib/types/types";


export default function UsersActivityPage() {
  const [users, setUsers] = useState<UserActivity[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "mostReviews" | "mostComments"
  >("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserActivity | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsersActivity();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users activity:", error);
      toast.error("Failed to load user activity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter and Sort
  useEffect(() => {
    let filtered = [...users];

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term),
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "mostReviews":
          return (b._count?.reviews || 0) - (a._count?.reviews || 0);
        case "mostComments":
          return (b._count?.comments || 0) - (a._count?.comments || 0);
        default:
          return 0;
      }
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, sortBy]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(
      (u) => (u._count?.reviews || 0) > 0 || (u._count?.comments || 0) > 0,
    ).length,
    totalReviews: users.reduce((acc, u) => acc + (u._count?.reviews || 0), 0),
    totalComments: users.reduce((acc, u) => acc + (u._count?.comments || 0), 0),
    avgEngagement:
      users.length > 0
        ? (
            users.reduce(
              (acc, u) =>
                acc + (u._count?.reviews || 0) + (u._count?.comments || 0),
              0,
            ) / users.length
          ).toFixed(1)
        : "0",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomlinear = (id: string) => {
    const linears = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-pink-500 to-rose-500",
    ];
    const index = parseInt(id.slice(-1)) % linears.length || 0;
    return linears[index];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-400 mt-4">Loading user activity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-8 ml-0 md:ml-50">
      <div className="relative z-10 p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
              User Activity
            </h1>
            <p className="text-gray-400 mt-1">
              Monitor user engagement and platform statistics
            </p>
          </div>
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition border border-gray-700"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats.totalUsers}
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-xl">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-green-400 mt-1">
                  {stats.activeUsers}
                </p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-xl">
                <Activity className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Reviews</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">
                  {stats.totalReviews}
                </p>
              </div>
              <div className="bg-yellow-500/10 p-3 rounded-xl">
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Comments</p>
                <p className="text-2xl font-bold text-purple-400 mt-1">
                  {stats.totalComments}
                </p>
              </div>
              <div className="bg-purple-500/10 p-3 rounded-xl">
                <MessageSquare className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by user name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition text-white placeholder-gray-500"
                />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none px-4 py-2 pr-10 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition text-white cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="mostReviews">Most Reviews</option>
                  <option value="mostComments">Most Comments</option>
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition border border-gray-700"
              >
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.length === 0 ? (
            <div className="col-span-full bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-12 text-center">
              <div className="inline-flex p-4 bg-gray-800 rounded-full mb-4">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No users found
              </h3>
              <p className="text-gray-400">
                {searchTerm
                  ? "Try adjusting your search"
                  : "No users registered yet"}
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="group bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 bg-linear-to-br ${getRandomlinear(
                          user.id,
                        )} rounded-xl flex items-center justify-center text-white font-bold text-lg`}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          {user.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-gray-500" />
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDetailsModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-white transition rounded-lg hover:bg-gray-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-800/30 rounded-xl">
                      <Star className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                      <p className="text-white font-bold text-lg">
                        {user._count?.reviews || 0}
                      </p>
                      <p className="text-gray-500 text-xs">Reviews</p>
                    </div>
                    <div className="text-center p-2 bg-gray-800/30 rounded-xl">
                      <MessageSquare className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                      <p className="text-white font-bold text-lg">
                        {user._count?.comments || 0}
                      </p>
                      <p className="text-gray-500 text-xs">Comments</p>
                    </div>
                    <div className="text-center p-2 bg-gray-800/30 rounded-xl">
                      <List className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                      <p className="text-white font-bold text-lg">
                        {user._count?.watchlist || 0}
                      </p>
                      <p className="text-gray-500 text-xs">Watchlist</p>
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-500 text-xs">
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredUsers.length > 0 && (
          <div className="text-center text-gray-500 text-sm">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedUser && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-linear-to-br from-gray-900 to-gray-800 p-6 border-b border-gray-700 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white">User Details</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Complete profile & activity
                </p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-20 h-20 bg-linear-to-br ${getRandomlinear(
                    selectedUser.id,
                  )} rounded-2xl flex items-center justify-center text-white font-bold text-3xl`}
                >
                  {getInitials(selectedUser.name)}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedUser.name}
                  </h3>
                  <p className="text-gray-400">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      Active
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 text-gray-400 rounded-lg text-xs">
                      <User className="w-3 h-3" />
                      {selectedUser.role || "User"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {selectedUser._count?.reviews || 0}
                  </p>
                  <p className="text-gray-400 text-sm">Reviews</p>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {selectedUser._count?.comments || 0}
                  </p>
                  <p className="text-gray-400 text-sm">Comments</p>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                  <List className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {selectedUser._count?.watchlist || 0}
                  </p>
                  <p className="text-gray-400 text-sm">Watchlist</p>
                </div>
              </div>

              {/* Account Info */}
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Account Information
                </h4>
                <div className="bg-gray-800/30 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Joined:</span>
                    <span className="text-white">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-white">
                      {new Date(selectedUser.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User ID:</span>
                    <span className="text-gray-400 text-xs font-mono">
                      {selectedUser.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <Link
                  href={`/admin/users/${selectedUser.id}/activity`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl transition border border-purple-500/20"
                >
                  <BarChart3 className="w-4 h-4" />
                  View Full History
                </Link>
                <button
                  onClick={() => {
                    toast.info(
                      `Contact feature coming soon for ${selectedUser.email}`,
                    );
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl transition border border-blue-500/20"
                >
                  <Mail className="w-4 h-4" />
                  Contact User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
