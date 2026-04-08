"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  image: string;
  rating: number;
  review: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    review:
      "CineTube is amazing! The premium content selection is fantastic and the streaming quality is top notch.",
    date: "Aug 14, 2025",
  },
  {
    id: "2",
    name: "Michael Lee",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 4,
    review:
      "Great platform for discovering movies. I especially like the watchlist feature and smooth UI.",
    date: "Sep 02, 2025",
  },
  {
    id: "3",
    name: "Emily Carter",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    review:
      "The subscription plan is worth every penny. I love the curated movie collections!",
    date: "Oct 10, 2025",
  },
  {
    id: "4",
    name: "David Kim",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    review:
      "Excellent platform. The interface is smooth and finding movies is very easy.",
    date: "Nov 03, 2025",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            What Our Users Say
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Thousands of movie lovers enjoy CineTube every day. Here’s what they
            think about our platform.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                {/* <Image
                  src={review.image}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                /> */}

                <div>
                  <h4 className="text-white font-semibold">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}