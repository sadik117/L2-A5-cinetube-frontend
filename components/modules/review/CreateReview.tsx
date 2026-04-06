/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createReview } from "@/services/review.api";
import { useState } from "react";


export default function CreateReview({ mediaId, onSuccess }: any) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content || rating < 1 || rating > 10) return;

    try {
      setLoading(true);
      await createReview({
        mediaId,
        content,
        rating,
        tags: [],
      });

      setContent("");
      setRating(0);
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
      <textarea
        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
        placeholder="Write your review..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* 1-10 Rating */}
      <div className="flex flex-wrap gap-2 mt-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((r) => (
          <button
            key={r}
            onClick={() => setRating(r)}
            className={`px-2 py-1 rounded ${
              rating === r ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
      >
        Submit Review
      </button>
    </div>
  );
}