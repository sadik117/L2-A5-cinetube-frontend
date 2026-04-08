/* eslint-disable @typescript-eslint/no-explicit-any */
// providers/auth-provider.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getMe } from "@/services/auth.api";
import { AuthContextType, User } from "@/lib/types/types";
import { api } from "@/lib/axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user on initial mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getMe();
        if (response.success && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {});
    } catch (error) {
      console.error("Backend logout failed:", error);
    } finally {
      // clear local state regardless of API success
      setUser(null);

      // Optional: Clear the token from document.cookie (only works if NOT httpOnly)
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // Redirect to login
      window.location.href = "/login";
    }
  };

  const refreshUser = async () => {
  try {
    const response = await getMe();
    const userData = response?.data || response;
    setUser(userData);
  } catch (error: any) {
    console.log(error);
    // 401 is expected when not logged in
    setUser(null);
  }
};

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refetchUser: refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
