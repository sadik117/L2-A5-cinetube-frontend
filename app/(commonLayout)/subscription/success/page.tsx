/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle, Film, Sparkles, Crown, Award, ArrowRight, Calendar, Download } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const id = params.get("session_id");
    setSessionId(id);

    if (id) {
      toast.success("Payment successful! Welcome to CineRate Premium!", {
        duration: 5000,
        icon: "🎉",
      });
    }

  }, [params, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-gray-900 flex items-center justify-center mt-10 px-4 py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 animate-float">
          <Sparkles className="w-6 h-6 text-yellow-500 opacity-50" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float-delayed">
          <Crown className="w-8 h-8 text-yellow-500 opacity-50" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-slow">
          <Award className="w-5 h-5 text-purple-500 opacity-50" />
        </div>
      </div>

      <div className="relative max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp">
          {/* Top Decoration */}
          <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600" />
          
          {/* Content */}
          <div className="p-8 md:p-12 text-center">
            {/* Success Animation */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
              <div className="relative w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-bounce-in">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              Payment Successful!
            </h1>
            
            {/* Subtitle */}
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for subscribing to CineRate Premium
            </p>

            {/* Session ID Display */}
            {sessionId && (
              <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl inline-block sm:hidden">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Transaction ID</p>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{sessionId}</p>
              </div>
            )}

            {/* Premium Features */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                You now have access to:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Film className="w-4 h-4 text-green-500" />
                  <span>Unlimited HD Streaming</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  <span>Ad-free Experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Crown className="w-4 h-4 text-green-500" />
                  <span>Exclusive Content</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Award className="w-4 h-4 text-green-500" />
                  <span>Early Access to New Releases</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Start Watching
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => router.push("/subscription")}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Manage Subscription
              </button>
            </div>

            {/* Download Receipt Link */}
            <button
              onClick={() => toast.info("Receipt sent to your email")}
              className="mt-4 text-sm text-green-600 dark:text-green-400 hover:underline flex items-center justify-center gap-1"
            >
              <Download className="w-3 h-3" />
              Download Receipt
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes floatDelayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: floatDelayed 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: floatSlow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}