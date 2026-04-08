/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  RefreshCw,
  Eye,
  Clock,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  getAllSubscriptions,
  getSubscriptionsAnalytics,
} from "@/services/admin.api";
import { Subscription, SubscriptionAnalytics } from "@/lib/types/types";


const PLAN_COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"];

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<
    Subscription[]
  >([]);
  const [analytics, setAnalytics] = useState<SubscriptionAnalytics | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [subsData, analyticsData] = await Promise.all([
        getAllSubscriptions(),
        getSubscriptionsAnalytics(),
      ]);

      setSubscriptions(subsData || []);
      setFilteredSubscriptions(subsData || []);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load subscriptions data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...subscriptions];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();

      filtered = filtered.filter(
        (sub) =>
          sub.user?.name?.toLowerCase().includes(term) ||
          sub.user?.email?.toLowerCase().includes(term) ||
          sub.plan?.toLowerCase().includes(term)
      );
    }

    setFilteredSubscriptions(filtered);
  }, [subscriptions, searchTerm]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusBadge = (status: string) => {
    const config: any = {
      active: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
      canceled: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
      expired: { icon: AlertCircle, color: "text-yellow-400", bg: "bg-yellow-500/10" },
      pending: { icon: Clock, color: "text-orange-400", bg: "bg-orange-500/10" },
    };

    const { icon: Icon, color, bg } = config[status] || config.pending;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${bg} ${color}`}>
        <Icon className="w-3.5 h-3.5" />
        {status}
      </span>
    );
  };

  const stats = {
    total: analytics?.total || 0,
    active: analytics?.active || 0,
    canceled: analytics?.canceled || 0,
    activePercentage: analytics?.activePercentage || 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="animate-spin w-10 h-10 text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen  mt-8 ml-0 md:ml-50 p-6 lg:p-8 space-y-6">

      {/* Header */}

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Subscription Management
          </h1>
          <p className="text-gray-400">Monitor subscribed users</p>
        </div>

        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-xl hover:bg-gray-700"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
          <Users className="text-purple-400 mb-2" />
          <p className="text-gray-400">Total Subscribed</p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
          <CheckCircle className="text-green-400 mb-2" />
          <p className="text-gray-400">Active</p>
          <p className="text-3xl font-bold text-white">{stats.active}</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
          <XCircle className="text-red-400 mb-2" />
          <p className="text-gray-400">Canceled</p>
          <p className="text-3xl font-bold text-white">{stats.canceled}</p>
        </div>

      </div>

      {/* Plan Chart */}

      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="text-lg text-white mb-4">Plan Distribution</h2>

        <div className="h-72">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analytics?.planDistribution || []}
                dataKey="count"
                nameKey="plan"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
              >
                {(analytics?.planDistribution || []).map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PLAN_COLORS[index % PLAN_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

        </div>
      </div>

      {/* Search */}

      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}

      <div className="overflow-x-auto bg-gray-900 rounded-2xl border border-gray-800">

        <table className="w-full text-sm">

          <thead className="border-b border-gray-800">
            <tr className="text-gray-400 text-left">
              <th className="p-4">User</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Status</th>
              <th className="p-4">Period</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredSubscriptions.map((sub) => (

              <tr key={sub.id} className="border-b border-gray-800 hover:bg-gray-800/30">

                <td className="p-4">
                  <div>
                    <p className="text-white">{sub.user?.name}</p>
                    <p className="text-gray-500 text-xs">{sub.user?.email}</p>
                  </div>
                </td>

                <td className="p-4">{sub.plan}</td>

                <td className="p-4">{getStatusBadge(sub.status)}</td>

                <td className="p-4 text-gray-400 text-xs">
                  {formatDate(sub.currentPeriodStart)} -{" "}
                  {formatDate(sub.currentPeriodEnd)}
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => {
                      setSelectedSubscription(sub);
                      setShowDetailsModal(true);
                    }}
                    className="p-2 hover:bg-gray-700 rounded-lg"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Modal */}

      {showDetailsModal && selectedSubscription && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Subscription Details
            </h2>

            <p className="text-gray-400 text-sm">User</p>
            <p className="text-white">{selectedSubscription.user.name}</p>

            <p className="text-gray-400 mt-4 text-sm">Plan</p>
            <p className="text-white">{selectedSubscription.plan}</p>

            <p className="text-gray-400 mt-4 text-sm">Status</p>
            {getStatusBadge(selectedSubscription.status)}

            <p className="text-gray-400 mt-4 text-sm">Billing Period</p>
            <p className="text-white">
              {formatDate(selectedSubscription.currentPeriodStart)} -{" "}
              {formatDate(selectedSubscription.currentPeriodEnd)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}