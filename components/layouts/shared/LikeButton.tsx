/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export default function LikeButton({
  initialLiked,
  initialCount,
  onToggle,
}: any) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const handleClick = async () => {
    setLiked(!liked);
    setCount((prev: number) => (liked ? prev - 1 : prev + 1));

    try {
      await onToggle();
    } catch {
      // rollback
      setLiked(liked);
      setCount(count);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 text-sm"
    >
      <Heart
        className={`w-4 h-4 ${
          liked ? "fill-red-500 text-red-500" : ""
        }`}
      />
      {count}
    </button>
  );
}