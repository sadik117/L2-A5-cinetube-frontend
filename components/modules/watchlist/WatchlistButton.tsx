/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { addToWatchlist } from "@/services/watchlist.api";
import { toast } from "sonner";
import { useRouter } from "next/router";


export default function WatchlistButton({ media }: any) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  if (!media) return null;

  const handleAdd = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await addToWatchlist(media.id);

      toast.success("Added to watchlist", {
        action: {
          label: "View",
          onClick: () => router.push("/watchlist"),
        },
      });
    } catch (err: any) {
      // handle duplicate
      if (err?.response?.status === 409) {
        toast.error("Already in watchlist");
      } else {
        toast.error("Failed to add");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <Bookmark className="w-4 h-4" />
      {loading ? "Adding..." : "Add to Watchlist"}
    </button>
  );
}
