"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/api/authApi";
import { useAppSelector } from "@/store/hooks";

export default function LoginPage() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user,"user form the redux store")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // check if user is already authenticated, if yes then redirect to dashboard
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user,router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setLoading(true);
    setError(null);
  
    try {
      await login({
        email,
        password,
      }).unwrap();
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">
          Login to Tournament Platform
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-white focus:ring-2 focus:ring-white text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-white focus:ring-2 focus:ring-white text-white"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 ${
              loading ? "bg-gray-500 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}
        </form>
        
        <div className="text-center text-sm text-gray-400">
          Don`&apos;`t have an account?{" "}
          <a href="/register" className="text-white hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}