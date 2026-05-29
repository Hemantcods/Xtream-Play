'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "@/lib/services/authService";
import { AuthResponse, LoginData, RegisterData } from "@/types/tournament";

interface AuthContextType {
  user: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    role: "admin" | "user" | "moderator";
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<
    {
      id: string;
      name: string;
      email?: string;
      phone?: string;
      role: "admin" | "user" | "moderator";
    } | null
  >(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = authService.getAccessToken();
        if (token && authService.isAuthenticated()) {
          const decoded = authService.decodeToken(token);
          if (decoded) {
            setUser({
              id: decoded.id,
              name: decoded.name,
              email: decoded.email,
              phone: decoded.phone,
              role: decoded.role,
            });
            console.log("User authenticated:", decoded);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response: AuthResponse = await authService.login(data);
      authService.setAccessToken(response.accessToken);
      authService.setRefreshToken(response.refreshToken);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response: AuthResponse = await authService.register(data);
      authService.setAccessToken(response.accessToken);
      authService.setRefreshToken(response.refreshToken);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const refreshToken = authService.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"}/api/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      authService.setAccessToken(data.accessToken);
      // If new refresh token is provided, update it
      if (data.refreshToken) {
        authService.setRefreshToken(data.refreshToken);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout(); // Logout if refresh fails
      throw error;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};