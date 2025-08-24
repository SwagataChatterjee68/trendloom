"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios"

export default function SignupPage() {
    const router=useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/users/register",formData)
            if (res.data) {
                toast.success("You are Registed in Successsfully")
                router.push("/login")
                console.log("Email:", email, "Password:", password);
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to Register")
        }

    };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Join <span className="font-semibold">TrendLoom</span> today and start your style journey
        </p>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="username"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-500 rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-500 rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-gray-500 border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-gray-800 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
