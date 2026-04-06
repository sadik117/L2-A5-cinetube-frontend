/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createComment, toggleCommentLike } from "@/services/comment.api";
import { useState } from "react";


export default function CommentItem({ comment, refresh }: any) {
  const [reply, setReply] = useState("");

  const handleReply = async () => {
    if (!reply) return;

    await createComment({
      content: reply,
      reviewId: comment.reviewId,
      parentId: comment.id,
    });

    setReply("");
    refresh();
  };

  return (
    <div className="ml-2 border-l pl-3">
      <p className="text-sm">{comment.content}</p>

      <div className="flex gap-2 text-xs mt-1">
        <button onClick={() => toggleCommentLike(comment.id)}>👍</button>
      </div>

      <div className="mt-2 flex gap-2">
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Reply..."
          className="p-1 text-sm bg-gray-100 dark:bg-gray-700 rounded"
        />
        <button onClick={handleReply}>Send</button>
      </div>

      {comment.replies?.map((r: any) => (
        <CommentItem key={r.id} comment={r} refresh={refresh} />
      ))}
    </div>
  );
}
