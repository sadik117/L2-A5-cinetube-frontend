import { api } from "@/lib/axios";
import { CreateReviewData } from "@/lib/types/types";


export const createReview = async (data: CreateReviewData) => {
  const res = await api.post("/review", data);
  return res.data;
};

export const getReviewsByMedia = async (mediaId: string) => {
  const res = await api.get(`/review/media/${mediaId}`);
  return res.data;
};

export const toggleReviewLike = async (reviewId: string) => {
  const res = await api.post(`/like/review/${reviewId}`);
  return res.data;
};
