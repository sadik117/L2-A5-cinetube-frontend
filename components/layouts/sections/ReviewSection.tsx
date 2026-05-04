"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, StarHalf, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

interface Review {
  id: string;
  name: string;
  image: string;
  rating: number;
  review: string;
  date: string;
  verified?: boolean;
  location?: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    review: "CineTube is amazing! The premium content selection is fantastic and the streaming quality is top notch. The recommendation algorithm helped me discover so many great movies I would have otherwise missed.",
    date: "Aug 14, 2025",
    verified: true,
    location: "New York, USA",
  },
  {
    id: "2",
    name: "Michael Lee",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 4,
    review: "Great platform for discovering movies. I especially like the watchlist feature and smooth UI. The review system is very helpful for deciding what to watch next.",
    date: "Sep 02, 2025",
    verified: true,
    location: "Los Angeles, USA",
  },
  {
    id: "3",
    name: "Emily Carter",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    review: "The subscription plan is worth every penny. I love the curated movie collections and the personalized recommendations. Customer support is also very responsive.",
    date: "Oct 10, 2025",
    verified: true,
    location: "London, UK",
  },
  {
    id: "4",
    name: "David Kim",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    review: "Excellent platform. The interface is smooth and finding movies is very easy. The 4K streaming quality is outstanding on my home theater system.",
    date: "Nov 03, 2025",
    verified: true,
    location: "Seoul, Korea",
  },
  {
    id: "5",
    name: "Jessica Patel",
    image: "https://i.pravatar.cc/150?img=28",
    rating: 5,
    review: "Best movie rating platform I've ever used! The community is active and reviews are genuine. Love the spoiler warning feature.",
    date: "Dec 15, 2025",
    verified: true,
    location: "Mumbai, India",
  },
  {
    id: "6",
    name: "Thomas Anderson",
    image: "https://i.pravatar.cc/150?img=52",
    rating: 4.5,
    review: "Great value for money. The yearly subscription saved me 20% and I get access to all premium content. Highly recommended for movie buffs!",
    date: "Jan 05, 2026",
    verified: true,
    location: "Berlin, Germany",
  },
];

// Helper function to render stars
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
      ))}
    </>
  );
};

export default function ReviewsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewsPerPage, setReviewsPerPage] = useState(4);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setReviewsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setReviewsPerPage(2);
      } else {
        setReviewsPerPage(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Testimonials</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            What Our Users Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
            Join thousands of satisfied movie lovers who use CineTube every day to discover and rate their favorite content.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="mb-10 p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-0.5">
                    {renderStars(averageRating)}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Based on {totalReviews}+ reviews
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">10K+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Active Users</div>
              </div>
              <div className="w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50K+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Reviews</div>
              </div>
              <div className="w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">App Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentReviews.map((review, index) => (
            <div
              key={review.id}
              className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200 dark:text-gray-700 opacity-50 group-hover:opacity-100 transition-opacity" />

              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover border-2 border-white dark:border-gray-700 relative z-10"
                  />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-semibold flex items-center gap-2">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                    {review.location && (
                      <>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{review.location}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 mb-3">
                {renderStars(review.rating)}
              </div>

              {/* Review */}
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-4">
                &quot;{review.review}&quot;
              </p>

              {/* Read More Button (if review is long) */}
              {review.review.length > 150 && (
                <button className="mt-3 text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium">
                  Read more →
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-8 h-8 rounded-lg transition-all duration-200 ${
                    currentPage === idx
                      ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}