// app/(admin)/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import AdminSidebar from "@/components/modules/admin/AdminSidebar";
import AdminHeader from "@/components/modules/admin/AdminHeader";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSidebarOpen]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-red-500 to-purple-600 rounded-full blur-xl animate-pulse" />
          <div className="relative w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-red-500 rounded-full animate-spin" />
        </div>
        <p className="ml-4 text-gray-600 dark:text-gray-400 font-medium">Loading admin panel...</p>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null; // will redirect via useEffect
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative z-50 h-full transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-30">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <AdminHeader />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}