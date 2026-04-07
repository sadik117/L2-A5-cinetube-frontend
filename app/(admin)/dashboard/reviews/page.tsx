// app/(admin)/reviews/page.tsx
"use client";

import { useState, useEffect } from "react";
import { getAllReviews, approveReview, deleteReview } from "@/services/admin.api";
import { toast } from "sonner";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await getAllReviews();
      setReviews(data);
    } catch (error) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveReview(id);
      toast.success("Review approved");
      fetchReviews();
    } catch (error) {
      toast.error("Failed to approve review");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      await deleteReview(id);
      toast.success("Review deleted");
      fetchReviews();
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  if (loading) return <div className="text-center py-20">Loading reviews...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Review Moderation</h1>

      <div className="bg-gray-900 rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-6">Review</th>
              <th className="text-left p-6">User</th>
              <th className="text-left p-6">Rating</th>
              <th className="text-left p-6">Status</th>
              <th className="text-right p-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="p-6">
                  <p className="line-clamp-2">{review.content}</p>
                </td>
                <td className="p-6">{review.user?.name}</td>
                <td className="p-6">{review.rating} ★</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-xs ${review.approved ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {review.approved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="p-6 text-right space-x-3">
                  {!review.approved && (
                    <button onClick={() => handleApprove(review.id)} className="text-green-400 hover:text-green-500">
                      Approve
                    </button>
                  )}
                  <button onClick={() => handleDelete(review.id)} className="text-red-400 hover:text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}