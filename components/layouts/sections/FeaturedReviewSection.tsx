// components/home/FeaturedReview.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Quote, Heart, MessageCircle, Share2, ThumbsUp } from "lucide-react";

interface FeaturedReview {
  id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  likes: number;
  comments: number;
  date: string;
}

export default function FeaturedReview() {
  const [review, setReview] = useState<FeaturedReview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedReview = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/featured`
        );
        const data = await response.json();
        setReview(data);
      } catch (error) {
        // Demo data
        setReview({
          id: "1",
          movieId: "1",
          movieTitle: "Oppenheimer",
          moviePoster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
          userName: "Dr. James Wilson",
          userAvatar: "https://i.pravatar.cc/150?img=15",
          rating: 9.5,
          content: "A cinematic masterpiece that explores the complexities of genius, guilt, and the atomic age. Christopher Nolan delivers his most mature work yet, with Cillian Murphy giving a career-defining performance. The film's non-linear narrative keeps you engaged throughout, and the Trinity test sequence is one of the most intense scenes ever put to film. A must-watch for anyone interested in history, science, or exceptional filmmaking.",
          likes: 1247,
          comments: 89,
          date: "March 15, 2024",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedReview();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-2xl h-96" />
        </div>
      </section>
    );
  }

  if (!review) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 border-t border-gray-200 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 mb-3">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-medium">Featured Review</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Review of the Week
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Movie Poster */}
            <div className="relative md:col-span-1 h-64 md:h-auto">
              <Image
                src={review.moviePoster}
                alt={review.movieTitle}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-4 left-4 md:hidden">
                <h3 className="text-white text-xl font-bold">{review.movieTitle}</h3>
              </div>
            </div>

            {/* Review Content */}
            <div className="md:col-span-2 p-6">
              <div className="hidden md:block mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {review.movieTitle}
                </h3>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={review.userAvatar}
                  alt={review.userName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {review.userName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {review.date}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(review.rating / 2)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {review.rating}/10
                </span>
              </div>

              {/* Review Text */}
              <div className="relative mb-4">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-200 dark:text-gray-700" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6">
                  {review.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}