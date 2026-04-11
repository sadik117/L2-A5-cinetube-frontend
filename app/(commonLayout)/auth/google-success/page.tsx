"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleSuccess() {
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          router.push("/");
        } else {
          router.push("/login");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative">
        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-4 border-red-200 dark:border-red-900/30 rounded-full animate-ping" />
          <div className="absolute w-24 h-24 border-4 border-purple-200 dark:border-purple-900/30 rounded-full animate-pulse" />
        </div>

        {/* Center content */}
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center space-y-4">
            {/* Google Icon with glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-red-500 to-purple-600 rounded-full blur-lg opacity-50 animate-pulse" />
              <svg className="relative w-12 h-12" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>

            {/* Loading text with dots */}
            <div className="text-center">
              <p className="text-lg font-semibold bg-linear-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                Redirecting to CineTube
              </p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div
                  className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
                <div
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Please wait a moment...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
