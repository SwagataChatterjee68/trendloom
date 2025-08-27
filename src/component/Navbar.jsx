"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin"; 

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gray-950 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-white"
        >
          Trend<span className="text-gray-500">Loom</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium text-white">
          <Link href="/" className="hover:text-gray-500 transition">Home</Link>
          <Link href="/about" className="hover:text-gray-500 transition">About</Link>
          <Link href="/product" className="hover:text-gray-500 transition">Products</Link>

          {isLoggedIn ? (
            <>
              {/* Show only for admins */}
              {isAdmin && (
                <>
                  <Link href="/product/create" className="hover:text-gray-500 transition">Create Product</Link>
                </>
              )}
              <Link href="/dashboard" className="hover:text-gray-500 transition">Profile</Link>
            </>
          ) : (
            <Link href="/login" className="hover:text-gray-500 transition">Login</Link>
          )}
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
        <div className="md:hidden bg-gray-950 shadow-md px-6 py-4 space-y-4 font-medium text-white">
          <Link href="/" onClick={() => setIsOpen(false)} className="block hover:text-gray-500 transition">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block hover:text-gray-500 transition">About</Link>
          <Link href="/product" onClick={() => setIsOpen(false)} className="block hover:text-gray-500 transition">Products</Link>

          {isLoggedIn ? (
            <>
              {/* Show only for admins */}
              {isAdmin && (
                <>
                  <Link href="/product/create" onClick={() => setIsOpen(false)} className="block hover:text-gray-500 transition">Create Product</Link>
                </>
              )}
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block hover:text-gray-500 transition">Profile</Link>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)} className="block hover:text-gray-500 transition">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
