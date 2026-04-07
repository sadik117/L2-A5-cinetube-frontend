/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getAnalytics } from "@/services/admin.api";
import { toast } from "sonner";
import { BarChart3, TrendingUp, Users, Film } from "lucide-react";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading analytics...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">${analytics?.totalRevenue || 0}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Active Subscribers</p>
              <p className="text-3xl font-bold mt-2">{analytics?.activeSubscribers || 0}</p>
            </div>
            <Users className="w-10 h-10 text-purple-500" />
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Avg. Session Time</p>
              <p className="text-3xl font-bold mt-2">{analytics?.avgSessionTime || 0} min</p>
            </div>
            <Film className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Most Watched</p>
              <p className="text-3xl font-bold mt-2">{analytics?.mostWatched || "N/A"}</p>
            </div>
            <BarChart3 className="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-3xl p-8">
        <h2 className="text-xl font-semibold mb-6">Monthly Growth</h2>
        <div className="h-80 flex items-center justify-center text-gray-500">
          Chart will be implemented here (using Recharts or Chart.js)
        </div>
      </div>
    </div>
  );
}