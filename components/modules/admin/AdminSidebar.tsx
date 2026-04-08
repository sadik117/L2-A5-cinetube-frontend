/* eslint-disable react-hooks/static-components */
/* eslint-disable react-hooks/set-state-in-effect */
// components/admin/AdminSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  MessageSquare,
  Users,
  BarChart3,
  LogOut,
  UserCheck,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Home,
} from "lucide-react";


const adminNav = [
  { href: "/", label: "Home", icon: Home, color: "text-blue-500" },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "text-blue-500" },
  { href: "/dashboard/media", label: "Manage Media", icon: Film, color: "text-purple-500" },
  { href: "/dashboard/reviews", label: "Reviews", icon: MessageSquare, color: "text-yellow-500" },
  { href: "/dashboard/comments", label: "Comments", icon: Users, color: "text-green-500" },
  { href: "/dashboard/users-activity", label: "User Activity", icon: UserCheck, color: "text-indigo-500" },
  { href: "/dashboard/subscriptions", label: "Subscriptions", icon: CreditCard, color: "text-pink-500" },
 
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  // Save collapsed state
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("adminSidebarCollapsed", String(newState));
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className={`p-3.5 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${isCollapsed ? "px-2" : ""}`}>
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <div className="relative w-9 h-9 bg-gradient-to-br from-red-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="font-bold text-xl tracking-tight bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                CineTube
              </p>
              <p className="text-xs text-gray-500 -mt-1">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {adminNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isCollapsed ? "justify-center" : ""}
                  ${isActive
                    ? "bg-gradient-to-r from-red-500/10 to-purple-500/10 text-red-600 dark:text-red-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                  }
                `}
              >
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? item.color : ""}`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-500 to-purple-600" />
                    )}
                  </>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Collapse Toggle Button (Desktop) */}
      <button
        onClick={toggleCollapse}
        className="absolute right-0 top-20 hidden md:flex items-center justify-center w-6 h-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fadeIn"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-72 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="relative h-full flex flex-col">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`
          hidden md:block fixed left-0 top-0 bottom-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 z-30
          ${isCollapsed ? "w-20" : "w-56"}
        `}
        onMouseEnter={() => isCollapsed && setIsHovered(true)}
        onMouseLeave={() => isCollapsed && setIsHovered(false)}
      >
        <div className="relative h-full flex flex-col">
          <SidebarContent />
        </div>
      </div>

    </>
  );
}