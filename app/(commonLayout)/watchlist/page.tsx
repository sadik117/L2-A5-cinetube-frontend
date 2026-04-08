/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMyWatchlist, removeFromWatchlist } from "@/services/watchlist.api";
import { toast } from "sonner";
import {
  Trash2,
  Film,
  Tv,
  Calendar,
  Star,
  BookmarkCheck,
  Sparkles,
  ArrowRight,
  Loader2,
  FilmIcon,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [router, authLoading, user]);

  const fetchWatchlist = async () => {
    try {
      const data = await getMyWatchlist();
      setWatchlist(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      // toast.error("Failed to load watchlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleRemove = async (mediaId: string) => {
    setRemovingId(mediaId);
    try {
      await removeFromWatchlist(mediaId);
      setWatchlist((prev) => prev.filter((item) => item.media.id !== mediaId));
      toast.success("Removed from watchlist");
    } catch (err) {
      toast.error("Failed to remove");
    } finally {
      setRemovingId(null);
    }
  };

  const formatRating = (rating: number) => rating?.toFixed(1) || "0.0";

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-500";
    if (rating >= 6) return "text-yellow-500";
    return "text-orange-500";
  };

  if (authLoading || loading || !user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-linear-to-r from-red-500 to-purple-600 rounded-full animate-ping opacity-75" />
            <div className="relative bg-linear-to-r from-red-500 to-purple-600 rounded-full p-6">
              <Film className="w-8 h-8 text-white animate-spin-slow" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your watchlist...
          </p>
        </div>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-fadeInUp">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-linear-to-r from-red-500 to-purple-600 rounded-full blur-2xl opacity-20" />
            <div className="relative bg-linear-to-r from-red-500 to-purple-600 rounded-full p-6">
              <BookmarkCheck className="w-16 h-16 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-red-500 to-purple-600 bg-clip-text text-transparent mb-3">
            Your Watchlist is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Discover amazing movies and series and add them to your watchlist
            for later.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/movies")}
              className="px-6 py-3 bg-linear-to-r from-red-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Film className="w-4 h-4" />
              Browse Movies
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push("/series")}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Browse Series
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-red-600 to-purple-700 text-white mt-16 py-4 mb-6">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-3">
                <BookmarkCheck className="w-8 h-8" />
                My Watchlist
              </h1>
              <p className="text-md opacity-90">
                {watchlist.length} {watchlist.length === 1 ? "item" : "items"}{" "}
                saved for later
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/movies")}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition flex items-center gap-2"
              >
                <Film className="w-4 h-4" />
                Add More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Watchlist Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5 lg:gap-6">
          {watchlist.map((item, index) => {
            const media = item.media;
            const addedDate = new Date(item.createdAt);
            const isNew =
              Date.now() - addedDate.getTime() < 7 * 24 * 60 * 60 * 1000;

            return (
              <div
                key={item.id}
                className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Media Image */}
                <div className="relative w-full aspect-[2/3] cursor-pointer overflow-hidden">
                  <Image
                    src={media.coverImage}
                    alt={media.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg flex items-center gap-1">
                    <Star
                      className={`w-3 h-3 ${getRatingColor(media.averageRating)} fill-current`}
                    />
                    <span
                      className={`text-xs font-bold ${getRatingColor(media.averageRating)}`}
                    >
                      {formatRating(media.averageRating)}
                    </span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg">
                    {media.type === "Series" ? (
                      <Tv className="w-3 h-3 text-white" />
                    ) : (
                      <Film className="w-3 h-3 text-white" />
                    )}
                  </div>

                  {/* New Badge */}
                  {isNew && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-linear-to-r from-red-500 to-purple-600 rounded-lg">
                      <span className="text-xs font-semibold text-white flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        New
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3 space-y-2">
                  <h3
                    className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    onClick={() => router.push(`/media/${media.id}`)}
                  >
                    {media.title}
                  </h3>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{media.releaseYear}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FilmIcon className="w-3 h-3" />
                      <span>{media.type}</span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(media.id)}
                    disabled={removingId === media.id}
                    className="w-full mt-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    {removingId === media.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Trash2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                        Remove
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
