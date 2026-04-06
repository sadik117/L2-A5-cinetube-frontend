// hooks/useMovieDetails.ts (or wherever your hook is)
import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/axios";
import { Media } from "@/lib/types/types";

export function useMediaDetails(id: string) {
  const [media, setMedia] = useState<Media | null>(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMediaDetails = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const [mediaRes, reviewsRes] = await Promise.all([
        api.get(`/movie/${id}`),
        api.get(`/review/media/${id}`)
      ]);
      
      setMedia(mediaRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error("Failed to fetch media details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const refetchReviews = useCallback(async () => {
    try {
      const reviewsRes = await api.get(`/review/media/${id}`);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error("Failed to refetch reviews:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchMediaDetails();
  }, [fetchMediaDetails]);

  return { media, reviews, loading, refetchReviews, fetchMediaDetails };
}