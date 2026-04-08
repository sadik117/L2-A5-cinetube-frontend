/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { getAllComments, approveComment, deleteComment } from "@/services/admin.api";
import { toast } from "sonner";
import { 
  MessageCircle, 
  CheckCircle, 
  Trash2, 
  User, 
  Search, 
  Filter, 
  ChevronDown,
  Calendar,
  AlertCircle,
  RefreshCw,
  Eye,
  XCircle,
  Clock,
} from "lucide-react";
import { Comment } from "@/lib/types/types";

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    let filtered = [...comments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (comment) =>
          comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.review?.mediaTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((comment) =>
        statusFilter === "approved" ? comment.isApproved : !comment.isApproved
      );
    }

    // Sort by newest first
    filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredComments(filtered);
  }, [comments, searchTerm, statusFilter]);

  const fetchComments = async () => {
    try {
      setLoading(true);
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
    if (!confirm("Are you sure you want to delete this comment? This action cannot be undone.")) return;

    try {
      await deleteComment(id);
      toast.success("Comment deleted successfully");
      fetchComments();
      setShowDetailsModal(false);
    } catch (error) {
      toast.error("Failed to delete comment");
    }
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
    total: comments.length,
    approved: comments.filter(c => c.isApproved).length,
    pending: comments.filter(c => !c.isApproved).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-400 mt-4">Loading comments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-10 ml-0 md:ml-48">
      <div className="relative z-10 p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Comment Moderation
            </h1>
            <p className="text-gray-400 mt-1">Manage and moderate user comments</p>
          </div>
          <button
            onClick={fetchComments}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition border border-gray-700"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Comments</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-xl">
                <MessageCircle className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-400 mt-1">{stats.approved}</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.pending}</p>
              </div>
              <div className="bg-yellow-500/10 p-3 rounded-xl">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by comment, user name, email, or media title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition text-white placeholder-gray-500"
                />
              </div>
              
              {/* Status Filter Tabs */}
              <div className="flex gap-2 bg-gray-800/30 rounded-xl p-1">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                    statusFilter === "all" 
                      ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter("pending")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                    statusFilter === "pending" 
                      ? "bg-linear-to-r from-yellow-600 to-orange-600 text-white shadow-lg" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Pending ({stats.pending})
                </button>
                <button
                  onClick={() => setStatusFilter("approved")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                    statusFilter === "approved" 
                      ? "bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-lg" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Approved ({stats.approved})
                </button>
              </div>
              
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition border border-gray-700"
              >
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Date Range</label>
                    <select className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>All time</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Sort By</label>
                    <select className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition">
                      <option>Newest First</option>
                      <option>Oldest First</option>
                      <option>Most Replies</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.length === 0 ? (
            <div className="bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-12 text-center">
              <div className="inline-flex p-4 bg-gray-800 rounded-full mb-4">
                <MessageCircle className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No comments found</h3>
              <p className="text-gray-400">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters to see more results"
                  : "There are no comments to moderate yet"}
              </p>
            </div>
          ) : (
            filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    {/* Comment Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          {getStatusBadge(comment.isApproved)}
                          {comment.review && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              <MessageCircle className="w-3 h-3" />
                              {comment.review.mediaTitle}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedComment(comment);
                            setShowDetailsModal(true);
                          }}
                          className="text-gray-400 hover:text-white transition lg:hidden"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">
                      Review: &quot;{comment.review?.content}&quot;
                      </p>

                      <p className="text-white text-sm font-semibold leading-relaxed mb-4 line-clamp-3">
                      Comment: &quot;{comment.content}&quot;
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
                          <div>
                            <span className="text-gray-300">{comment.user.name}</span>
                            <span className="text-gray-500 text-xs ml-2">({comment.user.email})</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {comment.review && comment.review.rating && (
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-gray-400 text-xs">{comment.review.rating}/10</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <button
                        onClick={() => handleApprove(comment.id)}
                        disabled={comment.isApproved}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                          comment.isApproved
                            ? "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                            : "bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20"
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Approve</span>
                      </button>
                      
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition border border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Delete</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedComment(comment);
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
        {filteredComments.length > 0 && (
          <div className="text-center text-gray-500 text-sm">
            Showing {filteredComments.length} of {comments.length} comments
          </div>
        )}
      </div>

      {/* Comment Details Modal */}
      {showDetailsModal && selectedComment && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-linear-to-br from-gray-900 to-gray-800 p-6 border-b border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white">Comment Details</h2>
                  <p className="text-gray-400 text-sm mt-1">Detailed view of user comment</p>
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
              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusBadge(selectedComment.isApproved)}
                </div>
                {selectedComment.review && selectedComment.review.rating && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white font-semibold">{selectedComment.review.rating}/10</span>
                  </div>
                )}
              </div>

              {/* Comment Content */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Comment Content
                </h3>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <p className="text-white leading-relaxed">
                    {selectedComment.content}
                  </p>
                </div>
              </div>

              {/* User Information */}
              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  User Information
                </h3>
                <div className="bg-gray-800/50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white font-medium">{selectedComment.user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">{selectedComment.user.email}</span>
                  </div>
                  {selectedComment.user.id && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">User ID:</span>
                      <span className="text-gray-400 text-sm">{selectedComment.user.id}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Review Information */}
              {selectedComment.review && (
                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Associated Review
                  </h3>
                  <div className="bg-gray-800/50 rounded-xl p-4 space-y-2">
                    {selectedComment.review.mediaTitle && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Media Title:</span>
                        <span className="text-white">{selectedComment.review.mediaTitle}</span>
                      </div>
                    )}
                    {selectedComment.review.rating && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rating:</span>
                        <span className="text-yellow-400">{selectedComment.review.rating} ★</span>
                      </div>
                    )}
                    {selectedComment.review.content && (
                      <div>
                        <span className="text-gray-400">Review Content:</span>
                        <p className="text-gray-300 text-sm mt-1 italic">
                          &quot;{selectedComment.review.content.substring(0, 150)}...&quot;
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Created
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(selectedComment.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Last Updated
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(selectedComment.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                {!selectedComment.isApproved && (
                  <button
                    onClick={() => {
                      handleApprove(selectedComment.id);
                      setShowDetailsModal(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl transition border border-green-500/20"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Comment
                  </button>
                )}
                <button
                  onClick={() => {
                    handleDelete(selectedComment.id);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}