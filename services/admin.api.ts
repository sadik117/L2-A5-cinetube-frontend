import { api } from "@/lib/axios";

export const getDashboardStats = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

export const getAllMedia = async () => {
    const res = await api.get("/movie");
    // console.log(res);
    return res.data.data;
}

export const createMedia = async (data: FormData) => {
  return api.post("/movie", data);
};

export const updateMedia = async (id: string, data: FormData) => {
  return api.patch(`/movie/${id}`, data);
};

export const deleteMedia = async (id: string) => {
  return api.delete(`/movie/${id}`);
};

export const getAllReviews = async () => {
  const res = await api.get("/review");
  return res.data;
};

export const approveReview = async (id: string) => {
  return api.patch(`/review/approve/${id}`);
};

export const deleteReview = async (id: string) => {
  return api.patch(`/review/unpublish/${id}`);
};

export const getAllComments = async () => {
  const res = await api.get("/comment");
  return res.data;
};

export const approveComment = async (id: string) => {
  return api.patch(`/comment/approve/${id}`);
};

export const deleteComment = async (id: string) => {
  return api.delete(`/comment/${id}`);
};

export const getAnalytics = async () => {
  const res = await api.get("/admin/analytics");
  return res.data;
};

export const getUsersActivity = async () => {
  const res = await api.get("/admin/users/activity");
  return res.data;
};

export const getAllSubscriptions = async () => {
  const res = await api.get("/admin/subscriptions");
  // console.log(res);
  return res.data.data;
};


export const getSubscriptionsAnalytics = async () => {
  const res = await api.get("/admin/subscriptions/analytics");
  // console.log(res.data.data);
  return res.data.data;
};
