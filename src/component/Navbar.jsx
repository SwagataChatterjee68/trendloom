"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50  bg-gray-950 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-wide  text-white">
          Trend<span className="text-gray-500">Loom</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="/" className="hover:text-gray-500 transition">Home</Link>
          <Link href="/about" className="hover:text-gray-500 transition">About</Link>
          <Link href="/blog" className="hover:text-gray-500 transition">Blogs</Link>
          <Link href="/blog/create" className="hover:text-gray-500 transition">Create Blog</Link>
          <Link href="/login" className="hover:text-gray-500 transition">Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-950 shadow-md px-6 py-4 space-y-4 font-medium">
          <Link
            href="/"
            className="block hover:text-gray-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block hover:text-gray-500 transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/blog"
            className="block hover:text-gray-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Blogs
          </Link>
          <Link
            href="/blog/create"
            className="block hover:text-gray-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Create Blog
          </Link>
          <Link
            href="/login"
            className="block hover:text-gray-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
