// app/(admin)/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/admin.api";
import { 
  Film, Users, MessageSquare, TrendingUp, 
  Star, Eye, Award 
} from "lucide-react";
import { toast } from "sonner";

interface DashboardStats {
  totalMedia: number;
  totalUsers: number;
  totalReviews: number;
  totalComments: number;
  averageRating: number;
  pendingReviews: number;
  trendingMedia: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-gray-400">Loading dashboard statistics...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-20 text-red-400">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Media",
      value: stats.totalMedia.toLocaleString(),
      icon: Film,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews.toLocaleString(),
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews.toLocaleString(),
      icon: MessageSquare,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Welcome back to the admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-gray-700 transition-all"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/dashboard/media"
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl transition group"
            >
              <Film className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition" />
              <p className="font-medium">Manage Media</p>
              <p className="text-xs text-gray-500 mt-1">Add, edit & delete content</p>
            </a>

            <a
              href="/admin/reviews"
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl transition group"
            >
              <MessageSquare className="w-8 h-8 text-yellow-400 mb-3 group-hover:scale-110 transition" />
              <p className="font-medium">Moderate Reviews</p>
              <p className="text-xs text-gray-500 mt-1">{stats.pendingReviews} pending</p>
            </a>
          </div>
        </div>

        {/* Platform Summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-6">Platform Summary</h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Average Rating</span>
              <span className="text-2xl font-bold text-yellow-400">
                {stats.averageRating ? stats.averageRating.toFixed(1) : "0.0"} ★
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Comments</span>
              <span className="font-semibold">{stats.totalComments?.toLocaleString() || "0"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Trending Items</span>
              <span className="font-semibold text-green-400">{stats.trendingMedia || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}