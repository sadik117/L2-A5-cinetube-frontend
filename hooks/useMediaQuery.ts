import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getMedia } from "@/services/movie.api";

export const useMediaQuery = (params: {
  page: number;
  limit: number;
  search?: string;
  type?: string;
  priceType?: string;
}) => {
  return useQuery({
    queryKey: ["media", params],
    queryFn: async () => {
      const res = await getMedia(params); 
      // res: { data: [], meta: {} }

      return {
        data: res?.data || [],
        meta: res?.meta || {},
      };
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
};