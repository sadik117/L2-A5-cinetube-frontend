/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getSubscriptions } from "@/services/admin.api";
import { toast } from "sonner";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await getSubscriptions();
        console.log(data);
        setSubscriptions(data);
      } catch (error) {
        toast.error("Failed to load subscriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <div className="text-center py-20">Loading subscriptions...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Subscriptions Management</h1>

      <div className="bg-gray-900 rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-6">User</th>
              <th className="text-left p-6">Plan</th>
              <th className="text-left p-6">Status</th>
              <th className="text-left p-6">Period</th>
              <th className="text-left p-6">Created</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="p-6">{sub.user?.name}</td>
                <td className="p-6 font-medium">{sub.plan}</td>
                <td className="p-6">
                  <span className={`px-4 py-1 rounded-full text-xs ${
                    sub.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td className="p-6 text-sm text-gray-400">
                  {sub.currentPeriodStart ? new Date(sub.currentPeriodStart).toLocaleDateString() : "-"} → 
                  {sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString() : "-"}
                </td>
                <td className="p-6 text-sm text-gray-400">
                  {new Date(sub.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}