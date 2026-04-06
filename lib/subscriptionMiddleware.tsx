/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PremiumGateProps {
  media: {
    priceType: "Premium" | "Free";
    title?: string;
  };
  user: any | null;
}

export default function PremiumGate({ media, user }: PremiumGateProps) {
  const router = useRouter();

  // Safe check
  const isPremiumContent = media?.priceType === "Premium";

  // Check if user has active subscription
  const hasActiveSubscription =
    user?.subscriptions?.some((sub: any) => sub.status === "active") ||
    user?.subscriptions?.status === "active";

  if (!isPremiumContent || hasActiveSubscription) {
    return null;
  }

  const handleUpgrade = () => {
    toast.info("Redirecting to subscription plans...", {
      description: `Unlock "${media.title}" and all premium content`,
    });
    router.push("/subscription");
  };

  return (
    <div className="mx-auto max-w-4xl mt-20 mb-4 px-4">
      <div className="bg-linear-to-br from-zinc-900 to-black border border-red-500/30 rounded-3xl p-10 text-center shadow-2xl">
        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center text-4xl">
          🔒
        </div>

        <h2 className="text-3xl font-bold text-white mb-3">
          Premium Content Locked
        </h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
          This title is only available for Premium subscribers. Get unlimited
          access to all premium movies and series.
        </p>

        <button
          onClick={handleUpgrade}
          className="bg-linear-to-r from-red-500 via-purple-600 to-red-600 hover:brightness-110 
                     px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-red-500/40 
                     transition-all active:scale-95"
        >
          Upgrade to Premium Now
        </button>

        <p className="text-xs text-gray-500 mt-6">
          Cancel anytime • Instant access
        </p>
      </div>
    </div>
  );
}
