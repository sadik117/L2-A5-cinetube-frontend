"use client";

import { useEffect, useState } from "react";
import { Users, Star, Film, Clock, TrendingUp, Award } from "lucide-react";

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
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "from-blue-500 to-cyan-500", suffix: "+" },
    { label: "Total Reviews", value: stats.totalReviews, icon: Star, color: "from-yellow-500 to-orange-500", suffix: "+" },
    { label: "Movies & Series", value: stats.totalMovies, icon: Film, color: "from-purple-500 to-pink-500", suffix: "+" },
    { label: "Average Rating", value: stats.averageRating, icon: Award, color: "from-green-500 to-emerald-500", prefix: "", suffix: "/10" },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <section id="stats-section" className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-2">
            Platform Statistics
          </h2>
          <p className="text-white/80">
            Join our growing community of movie enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transform transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {formatNumber(item.value)}
                  {item.suffix && !item.suffix.includes("/") && item.suffix}
                </div>
                <div className="text-sm text-white/70">{item.label}</div>
                {item.suffix?.includes("/") && (
                  <div className="text-xs text-white/50 mt-1">{item.suffix}</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-white/80 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Growing weekly with thousands of new reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}