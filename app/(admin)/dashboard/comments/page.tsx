// app/(admin)/comments/page.tsx
"use client";

import { useState, useEffect } from "react";
import { getAllComments, approveComment, deleteComment } from "@/services/admin.api";
import { toast } from "sonner";
import { MessageCircle, CheckCircle, Trash2, User } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  user: {
    name: string;
    email: string;
  };
  review?: {
    id: string;
    mediaTitle?: string;
  };
  approved: boolean;
  createdAt: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await getAllComments();
      setComments(data);
    } catch (error) {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveComment(id);
      toast.success("Comment approved successfully");
      fetchComments();
    } catch (error) {
      toast.error("Failed to approve comment");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await deleteComment(id);
      toast.success("Comment deleted successfully");
      fetchComments();
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  const filteredComments = comments.filter((comment) => {
    if (filter === "pending") return !comment.approved;
    if (filter === "approved") return comment.approved;
    return true; // "all"
  });

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-gray-400">
        Loading comments...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Comment Moderation</h1>

        <div className="flex gap-2 bg-gray-900 rounded-2xl p-1">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
              filter === "all" ? "bg-red-600 text-white" : "hover:bg-gray-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
              filter === "pending" ? "bg-red-600 text-white" : "hover:bg-gray-800"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
              filter === "approved" ? "bg-red-600 text-white" : "hover:bg-gray-800"
            }`}
          >
            Approved
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-3xl overflow-hidden">
        {filteredComments.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No comments found in this filter</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-6">Comment</th>
                <th className="text-left p-6">User</th>
                <th className="text-left p-6">Review</th>
                <th className="text-left p-6">Date</th>
                <th className="text-left p-6">Status</th>
                <th className="text-right p-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.map((comment) => (
                <tr key={comment.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="p-6 max-w-md">
                    <p className="line-clamp-2 text-gray-300">{comment.content}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{comment.user.name}</p>
                        <p className="text-xs text-gray-500">{comment.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-sm text-gray-400">
                    {comment.review?.mediaTitle || "Unknown Review"}
                  </td>
                  <td className="p-6 text-sm text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-6">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                        comment.approved
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {comment.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="p-6 text-right space-x-4">
                    {!comment.approved && (
                      <button
                        onClick={() => handleApprove(comment.id)}
                        className="text-green-400 hover:text-green-500 transition"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-red-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}