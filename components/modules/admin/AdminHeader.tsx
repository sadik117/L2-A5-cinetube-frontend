/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import Image from "next/image";
import { 
  Bell, 
  Search, 
  Settings, 
  HelpCircle, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  Shield,
  Sparkles,
  Sun,
  Moon,
  User,
  Mail,
  Award,
  Clock
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "New User Registration",
      message: "John Doe just joined CineTube",
      time: "5 minutes ago",
      read: false,
      type: "user",
    },
    {
      id: 2,
      title: "New Review Posted",
      message: "Someone reviewed 'Dune: Part Two'",
      time: "1 hour ago",
      read: false,
      type: "review",
    },
    {
      id: 3,
      title: "Subscription Renewal",
      message: "Premium subscription renewed by user",
      time: "3 hours ago",
      read: true,
      type: "subscription",
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 md:left-16 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800"
            : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left Section */}
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2 ml-10 md:ml-36">
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Sun className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              )}

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-xl bg-gray-400 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fadeInDown">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      <button className="text-xs text-red-500 hover:text-red-600">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer ${
                            !notif.read ? "bg-red-50/50 dark:bg-red-900/10" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              !notif.read ? "bg-red-500" : "bg-gray-300"
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {notif.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full text-center text-sm text-red-500 hover:text-red-600 font-medium">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 px-1 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                >
                  <div className="relative">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={30}
                        height={30}
                        className="rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-red-500 transition-all"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-red-500 transition-all">
                        {user?.name?.[0]?.toUpperCase() || "A"}
                      </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                  </div>
                  
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Administrator
                    </p>
                  </div>
                  
                  <ChevronDown className={`hidden lg:block w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fadeInDown">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        {user?.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {user?.name?.[0]?.toUpperCase() || "A"}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    
                      <div className="my-1" />
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div> 
                )}
              </div>
            </div>
          </div>

        </div>
      </header>
    </>
  );
}