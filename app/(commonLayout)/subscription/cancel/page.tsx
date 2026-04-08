"use client";

import { useRouter } from "next/navigation";
import { XCircle, AlertCircle, CreditCard, RefreshCw, Home, Heart, MessageCircle } from "lucide-react";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-gray-900 flex items-center justify-center mt-10 px-4 py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 animate-float">
          <AlertCircle className="w-6 h-6 text-orange-500 opacity-50" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float-delayed">
          <CreditCard className="w-8 h-8 text-red-500 opacity-50" />
        </div>
      </div>

      <div className="relative max-w-2xl w-full">
        {/* Cancel Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp">
          {/* Top Decoration */}
          <div className="h-2 bg-linear-to-r from-red-500 to-orange-500" />
          
          {/* Content */}
          <div className="p-8 md:p-12 text-center">
            {/* Cancel Animation */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
              <div className="relative w-24 h-24 bg-linear-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce-in">
                <XCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3">
              Payment Cancelled
            </h1>
            
            {/* Subtitle */}
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your transaction was not completed
            </p>

            {/* Help Message */}
            <div className="bg-linear-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Need help?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Don&apos;t worry! You can try again or contact our support team for assistance.
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <MessageCircle className="w-4 h-4 text-red-500" />
                  <span>Support available 24/7</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <RefreshCw className="w-4 h-4 text-orange-500" />
                  <span>You can retry payment anytime</span>
                </div>
              </div>
            </div>

            {/* Possible Reasons */}
            <div className="mb-8 text-left">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Possible reasons:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Insufficient funds in your account</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Card expired or invalid</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Payment timeout or connection issue</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>You cancelled the payment manually</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={() => router.push("/subscription")}
                className="px-6 py-3 bg-linear-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            </div>

            {/* Support Link */}
            <div className="mt-4">
              <button
                onClick={() => router.push("/contact")}
                className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <MessageCircle className="w-3 h-3" />
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Alternative Message */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Changed your mind?{" "}
            <button
              onClick={() => router.push("/subscription")}
              className="text-red-600 dark:text-red-400 hover:underline font-medium"
            >
              Choose a different plan
            </button>
          </p>
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
      `}</style>
    </div>
  );
}