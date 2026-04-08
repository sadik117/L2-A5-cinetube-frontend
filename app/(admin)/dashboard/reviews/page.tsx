/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getAllReviews,
  approveReview,
  deleteReview,
} from "@/services/admin.api";
import { toast } from "sonner";
import {
  Star,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  ChevronDown,
  MessageSquare,
  User,
  Calendar,
  Eye,
  AlertCircle,
  RefreshCw,
  Film,
} from "lucide-react";
import { Review } from "@/lib/types/types";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "approved" | "pending"
  >("all");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "highest" | "lowest"
  >("newest");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getAllReviews();
      setReviews(data);
    } catch (error) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortReviews = useCallback(() => {
    let filtered = [...reviews];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.media?.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((review) =>
        statusFilter === "approved" ? review.isApproved : !review.isApproved,
      );
    }

    // Rating filter
    if (ratingFilter !== "all") {
      filtered = filtered.filter((review) => review.rating === ratingFilter);
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
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
  }, [reviews, searchTerm, statusFilter, ratingFilter, sortBy]);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    filterAndSortReviews();
  }, [filterAndSortReviews]);

  const handleApprove = async (id: string) => {
    try {
      const res = await approveReview(id);
      // console.log(res.data);

      if (res?.data?.success) {
        toast.success("Review approved successfully");
        fetchReviews();
      } else {
        throw new Error(res?.data?.message || "Approval failed");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to approve review");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await deleteReview(id);
      console.log(res.data);

      if (res?.data?.success) {
        toast.success("Review deleted successfully");
        fetchReviews();
      } else {
        throw new Error(res?.data?.message || "Delete failed");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete review");
    }
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(10)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (approved: boolean) => {
    return approved ? (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
        <CheckCircle className="w-3 h-3" />
        Approved
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
        <AlertCircle className="w-3 h-3" />
        Pending
      </span>
    );
  };

  const stats = {
    total: reviews.length,
    approved: reviews.filter((r) => r.isApproved).length,
    pending: reviews.filter((r) => !r.isApproved).length,
    averageRating:
      reviews.length > 0
        ? (
            reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
          ).toFixed(1)
        : "0.0",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-400 mt-4">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative z-10 p-6 lg:p-8 space-y-6 mt-8 ml-0 md:ml-50">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              Review Moderation
            </h1>
            <p className="text-gray-400 mt-1">
              Manage and moderate user reviews
            </p>
          </div>
          <button
            onClick={fetchReviews}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition border border-gray-700"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Reviews</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-xl">
                <MessageSquare className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-400 mt-1">
                  {stats.approved}
                </p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">
                  {stats.pending}
                </p>
              </div>
              <div className="bg-yellow-500/10 p-3 rounded-xl">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Rating</p>
                <p className="text-2xl font-bold text-purple-400 mt-1">
                  {stats.averageRating}★
                </p>
              </div>
              <div className="bg-purple-500/10 p-3 rounded-xl">
                <Star className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by review content, user name, or media title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition text-white placeholder-gray-500"
                />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition border border-gray-700"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition"
                    >
                      <option value="all">All Reviews</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Rating
                    </label>
                    <select
                      value={ratingFilter}
                      onChange={(e) =>
                        setRatingFilter(
                          e.target.value === "all"
                            ? "all"
                            : Number(e.target.value),
                        )
                      }
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition"
                    >
                      <option value="all">All Ratings</option>
                      <option value="10">10 Stars</option>
                      <option value="9">9 Stars</option>
                      <option value="8">8 Stars</option>
                      <option value="7">7 Stars</option>
                      <option value="6">6 Stars</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest">Highest Rating</option>
                      <option value="lowest">Lowest Rating</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-12 text-center">
              <div className="inline-flex p-4 bg-gray-800 rounded-full mb-4">
                <MessageSquare className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No reviews found
              </h3>
              <p className="text-gray-400">
                {searchTerm || statusFilter !== "all" || ratingFilter !== "all"
                  ? "Try adjusting your filters to see more results"
                  : "There are no reviews to moderate yet"}
              </p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          {getRatingStars(review.rating)}
                          <span className="text-sm text-gray-400">
                            ({review.rating}/10)
                          </span>
                          {getStatusBadge(review.isApproved)}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedReview(review);
                            setShowDetailsModal(true);
                          }}
                          className="text-gray-400 hover:text-white transition lg:hidden"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-white leading-relaxed mb-4 line-clamp-3">
                        {review.content}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-300">
                            {review.user.name}
                          </span>
                        </div>

                        {review.media && (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                              <Film className="w-3 h-3 text-blue-400" />
                            </div>
                            <span className="text-gray-400">
                              {review.media.title}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <button
                        onClick={() => handleApprove(review.id)}
                        disabled={review.isApproved}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                          review.isApproved
                            ? "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                            : "bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20"
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Approve</span>
                      </button>

                      <button
                        onClick={() => handleDelete(review.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition border border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Unpublish</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedReview(review);
                          setShowDetailsModal(true);
                        }}
                        className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white rounded-xl transition"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results Count */}
        {filteredReviews.length > 0 && (
          <div className="text-center text-gray-500 text-sm">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </div>
        )}
      </div>

      {/* Review Details Modal */}
      {showDetailsModal && selectedReview && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-br from-gray-900 to-gray-800 p-6 border-b border-gray-700 z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Review Details
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Detailed view of user feedback
                  </p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Rating and Status */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  {getRatingStars(selectedReview.rating)}
                  <span className="text-2xl font-bold text-white">
                    {selectedReview.rating}/10
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedReview.isApproved)}
                  {selectedReview.isSpoiler && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                      <AlertCircle className="w-3 h-3" />
                      Contains Spoilers
                    </span>
                  )}
                </div>
              </div>

              {/* Tags Section */}
              {selectedReview.tags && selectedReview.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <span>🏷️</span>
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedReview.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-medium border border-purple-500/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Spoiler Warning */}
              {selectedReview.isSpoiler && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-400 font-semibold text-sm mb-1">
                        ⚠️ Spoiler Alert
                      </h4>
                      <p className="text-red-300/80 text-sm">
                        This review contains spoilers. Reader discretion is
                        advised.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Review Content */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">
                  Review Content
                </h3>
                <div
                  className={`${selectedReview.isSpoiler ? "blur-sm hover:blur-none transition-all duration-300 cursor-pointer" : ""}`}
                >
                  <p className="text-white leading-relaxed">
                    {selectedReview.content}
                  </p>
                  {selectedReview.isSpoiler && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Hover to reveal spoiler content
                    </p>
                  )}
                </div>
              </div>

              {/* User and Media Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    User Information
                  </h3>
                  <div className="space-y-1">
                    <p className="text-white font-medium">
                      {selectedReview.user.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {selectedReview.user.email}
                    </p>
                  </div>
                </div>

                {selectedReview.media && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                      <Film className="w-4 h-4" />
                      Media Information
                    </h3>
                    <div className="space-y-1">
                      <p className="text-white font-medium">
                        {selectedReview.media.title}
                      </p>
                      <p className="text-gray-400 text-sm capitalize">
                        {selectedReview.media.type}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Created
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(selectedReview.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Last Updated
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(selectedReview.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                {!selectedReview.isApproved && (
                  <button
                    onClick={() => {
                      handleApprove(selectedReview.id);
                      setShowDetailsModal(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl transition border border-green-500/20"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Review
                  </button>
                )}
                <button
                  onClick={() => {
                    handleDelete(selectedReview.id);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                  Unpublish Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
