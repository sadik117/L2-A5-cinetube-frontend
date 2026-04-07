// app/(admin)/users/activity/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getUsersActivity } from "@/services/admin.api";
import { toast } from "sonner";
import { User, Clock, Calendar, MessageSquare, List } from "lucide-react";

export default function UsersActivityPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersActivity();
        setUsers(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load user activity");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-gray-400">
        Loading user activity...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">User Activity</h1>
        <p className="text-gray-400 mt-1">Recent user engagement and statistics</p>
      </div>

      <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-6">User</th>
              <th className="text-left p-6">Joined</th>
              <th className="text-left p-6">Reviews</th>
              <th className="text-left p-6">Comments</th>
              <th className="text-left p-6">Watchlist</th>
              <th className="text-center p-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-white font-medium">
                      {user.name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium">{user._count?.reviews || 0}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    <span className="font-medium">{user._count?.comments || 0}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4 text-purple-400" />
                    <span className="font-medium">{user._count?.watchlist || 0}</span>
                  </div>
                </td>
                <td className="p-6 text-center">
                  <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No user activity data available yet.
        </div>
      )}
    </div>
  );
}