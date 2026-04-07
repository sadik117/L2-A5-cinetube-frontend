"use client";

import { useAuth } from "@/components/providers/auth-provider";
import Image from "next/image";

export default function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-gray-800 bg-gray-950 px-8 flex items-center justify-between">
      <div className="font-semibold text-lg">Admin Dashboard</div>

      <div className="flex items-center gap-4">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {user?.name?.[0] || "A"}
          </div>
        )}
        <div>
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
      </div>
    </header>
  );
}