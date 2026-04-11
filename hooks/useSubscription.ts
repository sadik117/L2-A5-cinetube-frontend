/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMySubscription } from "@/services/subscription.api";
import { useEffect, useState, useCallback } from "react";

export const useSubscription = (enabled: boolean) => {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(enabled);

  const fetchSubscription = useCallback(async () => {
    if (!enabled) return; // block

    try {
      const res = await getMySubscription();
      setSubscription(res);
    } catch (err: any) {
      if (err.response?.status !== 401) {
        console.error("sub error:", err);
      }
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (enabled) fetchSubscription(); // only when allowed
  }, [fetchSubscription, enabled]);

  return { subscription, loading, refetch: fetchSubscription };
};