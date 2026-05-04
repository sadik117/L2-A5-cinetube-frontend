/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Clock, Star } from "lucide-react";

export const MediaRow = ({ title, items }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [autoSlide, setAutoSlide] = useState(true);

  // Auto slide functionality
  useEffect(() => {
    if (!autoSlide || hovered || !ref.current) return;

    const interval = setInterval(() => {
      if (!ref.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = ref.current;

      // Scroll by card width (140px card + 12px gap = 152px)
      const cardWidth = 152;
      const nextScroll = scrollLeft + cardWidth;

      // If reached the end, scroll back to start
      if (nextScroll + clientWidth >= scrollWidth) {
        ref.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        ref.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 4000); // Auto slide every 4 seconds

    return () => clearInterval(interval);
  }, [autoSlide, hovered]);

  const scroll = (direction: "left" | "right") => {
    if (!ref.current) return;

    const cardWidth = 152; // 140px card + 12px gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    ref.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-8 py-2 md:py-4 text-black dark:text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-lg font-semibold text-black dark:text-white">{title}</h3>

        {/* Auto-slide toggle indicator */}
        <button
          onClick={() => setAutoSlide(!autoSlide)}
          className="text-xs px-2 py-1 rounded-full dark:bg-gray-800 bg-gray-400 hover:bg-gray-600 transition"
        >
          {autoSlide ? "⏸ Auto-slide" : "▶ Auto-slide"}
        </button>
      </div>

      {/* Carousel */}
      <div className="relative group">
        {/* Left Navigation */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>

        {/* Cards Container */}
        <div
          ref={ref}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {items.map((item: any) => (
            <div
              key={item.id}
              className="relative flex-shrink-0 w-[140px] group/card cursor-pointer transition-all duration-300 hover:scale-105"
            >
              {/* Card */}
              <div className="relative rounded-lg overflow-hidden bg-gray-900">
                {/* Image - Smaller size */}
                <div className="relative w-full h-[200px]">
                  <Image
                    src={
                      item.coverImage || item.posterUrl || "/placeholder.jpg"
                    }
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="140px"
                  />

                  {/* Rating badge */}
                  {item.rating && (
                    <div className="absolute top-1 right-1 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-sm">
                      <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold text-white">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Info */}
                <div className="p-2">
                  <h4 className="text-sm font-medium text-white truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-xs text-gray-400">
                      {item.releaseYear || item.year}
                    </p>
                    {item.duration && (
                      <div className="flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5 text-gray-500" />
                        <span className="text-xs text-gray-500">
                          {item.duration}m
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Navigation */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
