/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getMySubscription } from "@/services/subscription.api";
import { useEffect, useState } from "react";


export const useSubscription = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
  try {
    const res = await getMySubscription();

    // console.log("SUB RESPONSE:", res);

    setSubscription(res);
  } catch (err) {
    console.error("sub error:", err);
    setSubscription(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchSubscription();
  }, []);

  return { subscription, loading, refetch: fetchSubscription };
};