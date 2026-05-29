import { jwtDecode } from "jwt-decode";

interface RegisterData {
  name: string;
  email?: string;
  phone?: string;
  password: string;
}

interface LoginData {
  email?: string;
  phone?: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    role: "admin" | "user" | "moderator";
  };
  accessToken: string;
  refreshToken: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    return response.json();
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    return response.json();
  },

  logout: () => {
    // Clear tokens from localStorage or cookies
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  setAccessToken: (token: string) => {
    localStorage.setItem("accessToken", token);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem("refreshToken");
  },

  setRefreshToken: (token: string) => {
    localStorage.setItem("refreshToken", token);
  },

  decodeToken: (token: string): any => {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    const token = authService.getAccessToken();
    if (!token) return false;
    
    const decoded = authService.decodeToken(token);
    console.log(decoded);
    if (!decoded) return false;
    
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;

    
  }
};