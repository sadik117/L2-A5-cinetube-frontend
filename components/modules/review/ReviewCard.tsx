/* eslint-disable @typescript-eslint/no-explicit-any */
import LikeButton from "@/components/layouts/shared/LikeButton";
import { toggleReviewLike } from "@/services/review.api";

export default function ReviewCard({ review }: any) {
  return (
    <div className="border rounded-lg p-4 mb-3">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{review.user.name}</h4>
        <span className="text-yellow-500">⭐ {review.rating}</span>
      </div>

      <p className="text-sm text-gray-300 my-2">{review.content}</p>

      <LikeButton
        initialLiked={review.isLiked}
        initialCount={review._count.likes}
        onToggle={() => toggleReviewLike(review.id)}
      />
    </div>
  );
}
