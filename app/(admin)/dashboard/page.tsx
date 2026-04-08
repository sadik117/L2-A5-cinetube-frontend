"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/admin.api";
import { 
  Film, Users, MessageSquare, TrendingUp, 
  Star, Calendar,
  ChevronRight, PlusCircle, Settings, 
  BarChart3, Sparkles, Zap,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { DashboardStats } from "@/lib/types/types";


export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        // mock growth data for demonstration
        setStats({
          ...data,
          monthlyGrowth: 23.5,
          activeUsers: Math.floor(data.totalUsers * 0.45),
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-400 mt-6 text-lg">Loading dashboard statistics...</p>
          <p className="text-gray-600 text-sm mt-2">Preparing your insights</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/10 rounded-full p-6 inline-block mb-4">
            <BarChart3 className="w-16 h-16 text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Unable to Load Data</h3>
          <p className="text-gray-400 mb-6">Failed to load dashboard data. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
          >
            Retry Now
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Media",
      value: stats.totalMedia.toLocaleString(),
      icon: Film,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      color: "text-blue-400",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      color: "text-purple-400",
      trend: "+18%",
      trendUp: true,
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews.toLocaleString(),
      icon: Star,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
      color: "text-yellow-400",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews.toLocaleString(),
      icon: MessageSquare,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/20 to-red-500/20",
      color: "text-orange-400",
      trend: "-8%",
      trendUp: false,
    },
  ];

  const quickActions = [
    {
      title: "Add New Media",
      description: "Upload movies, series, or documentaries",
      icon: PlusCircle,
      href: "/dashboard/media",
      color: "from-green-500 to-emerald-500",
      bgHover: "hover:bg-gradient-to-r hover:from-green-500/10 hover:to-emerald-500/10",
    },
    {
      title: "Manage Media",
      description: "Edit, update, or remove content",
      icon: Film,
      href: "/dashboard/media",
      color: "from-blue-500 to-cyan-500",
      bgHover: "hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10",
    },
    {
      title: "Moderate Reviews",
      description: `${stats.pendingReviews} pending reviews to check`,
      icon: MessageSquare,
      href: "/dashboard/reviews",
      color: "from-yellow-500 to-orange-500",
      bgHover: "hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-orange-500/10",
    },
    {
      title: "View Analytics",
      description: "Detailed platform insights",
      icon: TrendingUp,
      href: "/dashboard/analytics",
      color: "from-purple-500 to-pink-500",
      bgHover: "hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10",
    },
  ];

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen mt-8 ml-0 md:ml-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-800 p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-400">Admin Dashboard</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Welcome back!
              </h1>
              <p className="text-gray-400 text-lg">
                Here&apos;s what&apos;s happening with your platform today
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{formatTime()}</p>
                  <p className="text-sm text-gray-400">{formatDate()}</p>
                </div>
                <div className="w-px h-12 bg-gray-700"></div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-3">
                  <Calendar className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`bg-gradient-to-r ${stat.gradient} p-3 rounded-2xl`}>
                      <Icon className={`w-6 h-6 text-white`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.trend}
                      {stat.trendUp ? '↑' : '↓'}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

 
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Quick Actions
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Manage your platform efficiently</p>
                </div>
                <Link 
                  href="/dashboard"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      href={action.href}
                      className={`group relative overflow-hidden bg-gray-800/50 rounded-2xl p-6 transition-all duration-300 ${action.bgHover} border border-gray-700 hover:border-transparent`}
                    >
                      <div className="relative z-10">
                        <div className={`bg-gradient-to-r ${action.color} p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                        <p className="text-gray-400 text-sm">{action.description}</p>
                      </div>
                      <ChevronRight className="absolute bottom-4 right-4 w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </Link>
                  );
                })}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}