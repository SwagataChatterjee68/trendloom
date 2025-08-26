"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default user

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users/login", { email, password, role });

      if (res.data.success) {
        // ✅ Save user details in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: res.data.user.id,
            email: res.data.user.email,
            role: res.data.user.role, // admin or user
            token: res.data.token,
          })
        );

        toast.success("Logged in successfully");

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to Login");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 text-black">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Log in to continue exploring{" "}
          <span className="font-semibold">TrendLoom</span>
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-gray-600 rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-gray-600 rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
              required
            />
          </div>

          {/* Role Selector */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Login as
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-gray-800 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
