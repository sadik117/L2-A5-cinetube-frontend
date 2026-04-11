/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useMediaDetails } from "@/hooks/useMovieDetails";
import ReviewCard from "@/components/modules/review/ReviewCard";
import CommentSection from "@/components/modules/comment/CommentSection";
import PageLoading from "@/components/ui/PageLoading";
import {
  Star,
  Calendar,
  Clock,
  Users,
  Film,
  Tv,
  Award,
  TrendingUp,
  Play,
  X,
  Share2,
  MessageCircle,
  ChevronRight,
  Send,
  AlertCircle,
  Plus,
  Bookmark,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import PremiumGate from "@/lib/subscriptionMiddleware";
import { useAuth } from "@/components/providers/auth-provider";
import { NotFound } from "@/components/layouts/shared/NotFound";
import { createReview, toggleReviewLike } from "@/services/review.api";
import { toast } from "sonner";
import WatchlistButton from "@/components/modules/watchlist/WatchlistButton";

const suggestedTags = [
  "Masterpiece",
  "Underrated",
  "Classic",
  "Great Acting",
  "Amazing Visuals",
  "Good Story",
  "Action Packed",
  "Emotional",
  "Must Watch",
  "Disappointing",
  "Slow Paced",
  "Funny",
];

export default function MediaDetailsPage() {
  const params = useParams();
  const { media, reviews, loading, refetchReviews } = useMediaDetails(
    params.id as string,
  );

  const [showTrailer, setShowTrailer] = useState(false);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();

  if (loading) return <PageLoading />;
  if (!media) return <NotFound />;

  const formatRating = (rating: number) => rating?.toFixed(1) || "0.0";

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-500";
    if (rating >= 6) return "text-yellow-500";
    return "text-orange-500";
  };

 <PremiumGate media={media} user={user} />;

  const handleCreateReview = async () => {
    if (!user) {
      toast.error("Please login to write a review");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please write your review");
      return;
    }

    if (rating < 1 || rating > 10) {
      toast.error("Please select a rating from 1 to 10");
      return;
    }

    setIsSubmitting(true);
    try {
      await createReview({
        mediaId: media.id,
        content: reviewText,
        rating,
        tags: selectedTags,
        isSpoiler,
      });

      toast.success("Review submitted! Awaiting admin approval.");
      setReviewText("");
      setRating(0);
      setSelectedTags([]);
      setIsSpoiler(false);
      setShowReviewBox(false);

      // refetchReviews is defined
      await refetchReviews();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeReview = async (reviewId: string) => {
    if (!user) {
      toast.error("Please login to like reviews");
      return;
    }

    try {
      await toggleReviewLike(reviewId);
      // Refetch reviews to update like count
      await refetchReviews();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to like review");
    }
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative h-[70vh] md:h-[105vh] overflow-hidden">
          {/* Backdrop Image */}
          <div className="absolute inset-0">
            <Image
              src={media.coverImage || "/placeholder-image.png"}
              alt={media.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-50 dark:from-gray-900 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Poster */}
              <div className="relative w-40 sm:w-48 md:w-64 mt-12 md:mt-0 rounded-xl overflow-hidden shadow-2xl shadow-black/50 animate-fadeInUp">
                <Image
                  src={media.coverImage || "/placeholder-image.png"}
                  alt={media.title}
                  width={300}
                  height={450}
                  className="object-cover mt-8 md:mt-0"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-white animate-fadeInUp animation-delay-200">
                {/* Title & Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {media.title}
                  </h1>
                  {/* {media.trending && (
                    <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-purple-600 rounded-full text-xs font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </span>
                  )} */}
                  {/* {media.awardWinning && (
                    <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-xs font-semibold flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Award Winner
                    </span>
                  )} */}
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{media.releaseYear}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <Clock className="w-4 h-4" />
                    <span>{media.duration}</span> */}
                  </div>
                  <div className="flex items-center gap-1">
                    <Film className="w-4 h-4" />
                    <span>
                      {media.type === "Series" ? "TV Series" : "Movie"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star
                      className={`w-4 h-4 ${getRatingColor(media.averageRating)} fill-current`}
                    />
                    <span
                      className={`font-semibold ${getRatingColor(media.averageRating)}`}
                    >
                      {formatRating(media.averageRating)}
                    </span>
                    <span className="text-gray-400">
                      ({media.totalReviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {media.genre?.map((g: string) => (
                    <span
                      key={g}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Synopsis */}
                <p className="text-gray-200 text-sm md:text-base mb-6 line-clamp-3 max-w-2xl">
                  {media.synopsis}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-purple-600 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <Play className="w-4 h-4" />
                    Watch Trailer
                  </button>

                  <WatchlistButton media={media} />

                  <button
                    onClick={handleShare}
                    className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Details Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Film className="w-5 h-5 text-red-500" />
                  About {media.type === "Series" ? "the Series" : "the Movie"}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {media.fullSynopsis || media.synopsis}
                </p>
              </div>

              {/* Cast & Crew */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Cast & Crew
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Director
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {media.director}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Cast
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {media.cast?.map((actor: string) => (
                        <span
                          key={actor}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                        >
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Streaming Platforms */}
              {media.platform && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Tv className="w-5 h-5 text-green-500" />
                    Where to Watch
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <p className="px-4 py-2 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-lg text-sm font-semibold">
                      {media.platform}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              {/* Rating Card */}
              <div className="bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Community Rating</h3>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">
                    {formatRating(media.averageRating)}
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(media.averageRating / 2) ? "fill-current" : ""}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm opacity-90">
                    Based on {media.totalReviews} user reviews
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-red-500" />
                User Reviews
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({reviews?.length || 0})
                </span>
              </h2>

              <button
                onClick={() => setShowReviewBox(!showReviewBox)}
                className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Write a Review
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Review Form */}
            {showReviewBox && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-700 animate-fadeInUp">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  Share Your Thoughts
                </h3>

                {/* Rating Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRating(r)}
                        onMouseEnter={() => setHoverRating(r)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`
                          w-10 h-10 rounded-full font-bold transition-all duration-200
                          ${
                            rating >= r
                              ? "bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg scale-110"
                              : hoverRating >= r
                                ? "bg-gradient-to-r from-red-500/50 to-purple-600/50 text-white scale-105"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                          }
                        `}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder="What did you think about this movie/series?"
                  />
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Tags (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm flex items-center gap-1"
                      >
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    {suggestedTags
                      .filter((tag) => !selectedTags.includes(tag))
                      .map((tag) => (
                        <button
                          key={tag}
                          onClick={() => addTag(tag)}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full text-sm transition flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          {tag}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Spoiler Warning */}
                <div className="mb-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="spoiler"
                    checked={isSpoiler}
                    onChange={(e) => setIsSpoiler(e.target.checked)}
                    className="w-4 h-4 text-red-500 rounded focus:ring-red-500"
                  />
                  <label
                    htmlFor="spoiler"
                    className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    This review contains spoilers
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCreateReview}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-2.5 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Review
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowReviewBox(false);
                      setReviewText("");
                      setRating(0);
                      setSelectedTags([]);
                      setIsSpoiler(false);
                    }}
                    className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Reviews List */}
            {!reviews || reviews.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                <MessageCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No Reviews Yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Be the first to review this {media.type}!
                </p>
                <button
                  onClick={() => setShowReviewBox(true)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                >
                  Write a Review
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review: any) => (
                  <div
                    key={review.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <ReviewCard review={review} />

                    {/* Like Button */}
                    <div className="px-6 pb-2 flex items-center gap-4">
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors group"
                      >
                        <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>
                          {review._count?.likes || review.likes?.length || 0}{" "}
                          likes
                        </span>
                      </button>
                    </div>

                    {/* Comments Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <CommentSection reviewId={review.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trailer Modal */}
        {showTrailer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-4xl mx-4">
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute -top-9 md:top-15 right-0 text-white hover:text-red-500 transition-colors"
              >
                <X className="w-7 h-7" />
              </button>
              <div className="relative pt-[56.25%] mt-0 md:mt-24">
                <iframe
                  src={media.youtubeLink?.replace("watch?v=", "embed/")}
                  className="absolute inset-0 w-full h-[400] rounded-xl shadow-2xl"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
