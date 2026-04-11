/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getMedia } from "@/services/movie.api";

export const useMedia = (initialParams: any) => {
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const res = await getMedia(params);
        // console.log(res.data);
        setData(res.data);
        setMeta(res.meta);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, [params]);

  return { data, meta, loading, params, setParams };
};