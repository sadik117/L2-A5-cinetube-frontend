import { api } from "@/lib/axios";

export const addToWatchlist = async (mediaId: string) => {
  return api.post("/watchlist/add", { mediaId });
};

export const removeFromWatchlist = async (mediaId: string) => {
  return api.delete(`/watchlist/${mediaId}`);
};

export const getMyWatchlist = async () => {
  const res = await api.get("/watchlist/my-watchlist");
  return res.data;
};