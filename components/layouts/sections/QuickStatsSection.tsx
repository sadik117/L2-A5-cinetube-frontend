"use client";

import { useEffect, useState } from "react";
import { Users, Star, Film, TrendingUp, Award } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalReviews: number;
  totalMovies: number;
  averageRating: number;
}

export default function QuickStats() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalReviews: 0,
    totalMovies: 0,
    averageRating: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        // Demo data
        setStats({
          totalUsers: 15284,
          totalReviews: 52300,
          totalMovies: 3450,
          averageRating: 8.4,
        });
      }
    };
    fetchStats();

    // Animation on scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const statItems = [
    { 
      label: "Total Users", 
      value: stats.totalUsers, 
      icon: Users, 
      gradient: "from-blue-500 to-cyan-500",
      darkGradient: "from-blue-600 to-cyan-600",
      suffix: "+" 
    },
    { 
      label: "Total Reviews", 
      value: stats.totalReviews, 
      icon: Star, 
      gradient: "from-yellow-500 to-orange-500",
      darkGradient: "from-yellow-600 to-orange-600",
      suffix: "+" 
    },
    { 
      label: "Movies & Series", 
      value: stats.totalMovies, 
      icon: Film, 
      gradient: "from-purple-500 to-pink-500",
      darkGradient: "from-purple-600 to-pink-600",
      suffix: "+" 
    },
    { 
      label: "Average Rating", 
      value: stats.averageRating, 
      icon: Award, 
      gradient: "from-green-500 to-emerald-500",
      darkGradient: "from-green-600 to-emerald-600",
      prefix: "", 
      suffix: "/10" 
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <section 
      id="stats-section" 
      className="py-16 bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Community Growth</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Platform Statistics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join our growing community of movie enthusiasts
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } hover:scale-105`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/0 via-rose-500/0 to-purple-500/0 group-hover:from-rose-500/20 group-hover:via-purple-500/20 group-hover:to-rose-500/20 transition-all duration-500" />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.gradient} dark:${item.darkGradient} mb-4 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Value */}
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatNumber(item.value)}
                  {item.suffix && !item.suffix.includes("/") && item.suffix}
                </div>
                
                {/* Label */}
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {item.label}
                </div>
                
                {/* Extra suffix */}
                {item.suffix?.includes("/") && (
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {item.suffix}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Stats Row */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Active Users Today: <strong className="text-gray-900 dark:text-white">2,847</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                New Reviews Today: <strong className="text-gray-900 dark:text-white">342</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-rose-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                23% growth this month
              </span>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm">
            <span>⭐</span>
            <span>Trusted by movie lovers worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}