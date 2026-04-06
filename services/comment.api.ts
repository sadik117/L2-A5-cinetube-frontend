/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios";


export const createComment = async (data: any) => {
  return api.post("/comment", data);
};

export const getCommentsInMedia = async (reviewId: string) => {
  const res = await api.get(`/comment/review/${reviewId}`);
  return res.data;
};


export const toggleCommentLike = async (commentId: string) => {
  const res = await api.post(`/like/comment/${commentId}`);
  return res.data;
};