"use client";

import { useEffect, useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { createCheckoutSession } from "@/services/subscription.api";
import { 
  Crown, 
  Zap, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  CreditCard, 
  Film,
  Tv,
  Download,
  ArrowRight
} from "lucide-react";
import Loading from "@/app/loading";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";

export default function SubscriptionPage() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");

  const { subscription, loading: subLoading } = useSubscription(true); 
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);


  const handleSubscribe = async (plan: "monthly" | "yearly") => {
  try {
    setCheckoutLoading(true);

    const res = await createCheckoutSession(plan);

    if (res.url) {
      window.location.href = res.url;
    }
  } catch (err) {
    console.error(err);
  } finally {
    setCheckoutLoading(false);
  }
};

  // Show loading while auth or subscription is loading
  if (authLoading || subLoading || !user) {
    return <Loading />;
  }

  const isActive = subscription?.status === "active";
  const isExpired = subscription?.status === "expired";

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-red-600 to-purple-700 text-white mt-14 py-6 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-sm rounded-full mb-1">
            <Crown className="w-5 h-5" />
          </div>
          <h1 className="text-lg md:text-xl font-bold mb-1">
            Upgrade Your Experience
          </h1>
          <p className="text-sm md:text-md opacity-90 max-w-2xl mx-auto">
            Get unlimited access to premium content, ad-free streaming, and exclusive features
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Current Plan Section */}
        <div className="mb-12">
          <div className={`rounded-2xl p-6 shadow-lg transition-all ${
            isActive 
              ? "bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500"
              : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  isActive 
                    ? "bg-linear-to-r from-green-500 to-emerald-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}>
                  {isActive ? (
                    <Crown className="w-6 h-6 text-white" />
                  ) : (
                    <CreditCard className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Current Plan
                  </h2>
                  {subscription ? (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {subscription.plan} plan • {subscription.status}
                      </p>
                      {isActive && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Next billing: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">No active subscription</p>
                  )}
                </div>
              </div>
              
              
            </div>

            {isActive && (
              <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  <span>Your premium features are active!</span>
                </div>
              </div>
            )}

            {isExpired && (
              <div className="mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>Your subscription has expired. Renew now to continue enjoying premium features.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex">
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedPlan === "monthly"
                  ? "bg-linear-to-r from-red-500 to-purple-600 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedPlan === "yearly"
                  ? "bg-linear-to-r from-red-500 to-purple-600 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <Film className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-xs text-gray-500">Limited Access</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Free</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Perfect for casual viewers</p>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                $0
                <span className="text-sm font-normal text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Basic access to free content
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Rate and review movies
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Create watchlist
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <XCircle className="w-4 h-4" />
                  Ads supported
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <XCircle className="w-4 h-4" />
                  No premium content
                </li>
              </ul>
              <button
                disabled={isActive}
                className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Current Plan
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className={`relative bg-linear-to-br from-red-50 to-purple-50 dark:from-red-900/20 dark:to-purple-900/20 rounded-2xl shadow-xl overflow-hidden transform scale-105 transition-all duration-300 hover:scale-110 ${
            isActive ? "border-2 border-green-500" : ""
          }`}>
            {isActive && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Active
              </div>
            )}
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-red-500/10 to-purple-500/10 rounded-full blur-2xl" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-linear-to-r from-red-500 to-purple-600 rounded-xl">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs bg-linear-to-r from-red-500 to-purple-600 text-white px-2 py-1 rounded-full">
                  Recommended
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Premium</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Ultimate streaming experience</p>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                ${selectedPlan === "monthly" ? "5" : "48"}
                <span className="text-sm font-normal text-gray-500">
                  /{selectedPlan === "monthly" ? "month" : "year"}
                </span>
                {selectedPlan === "yearly" && (
                  <span className="ml-2 text-sm text-green-600">Save $12/year</span>
                )}
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Unlimited access to premium content
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Ad-free experience
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Early access to new releases
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  HD & 4K streaming
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Download for offline viewing
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Priority support
                </li>
              </ul>
              <button
                onClick={() => handleSubscribe(selectedPlan)}
                disabled={checkoutLoading || isActive}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                  isActive
                    ? "bg-green-500 text-white cursor-default"
                    : "bg-linear-to-r from-red-500 to-purple-600 text-white hover:shadow-lg hover:shadow-red-500/25"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {checkoutLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : isActive ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Currently Active
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Upgrade to Premium
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-4">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Everything included in Premium
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-linear-to-r from-red-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Unlimited Streaming</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Watch any movie or series anytime, anywhere
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-linear-to-r from-red-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Tv className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">4K Ultra HD</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Crystal clear picture quality on all devices
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-linear-to-r from-red-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Offline Viewing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Download content and watch without internet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// AlertCircle component if not available
const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);