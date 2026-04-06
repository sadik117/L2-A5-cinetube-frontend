/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { createComment, getCommentsInMedia } from "@/services/comment.api";

export default function CommentSection({ reviewId }: any) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    const data = await getCommentsInMedia(reviewId);
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [reviewId]);

  const handleComment = async () => {
    if (!content) return;

    await createComment({ reviewId, content });
    setContent("");
    fetchComments();
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-3">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded"
          placeholder="Write a comment..."
        />
        <button onClick={handleComment}>Post</button>
      </div>

      <div className="space-y-2">
        {comments.map((c: any) => (
          <CommentItem key={c.id} comment={c} refresh={fetchComments} />
        ))}
      </div>
    </div>
  );
}
