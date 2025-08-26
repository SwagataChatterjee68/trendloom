"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("/api/posts/get-posts");
      if (res.data.success) setBlogs(res.data.posts);
    };
    fetchBlogs();
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen py-20 px-6">
      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
          Latest <span className="text-gray-600">Blogs</span>
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Discover insights, stories, and updates from Trendloom.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog._id}`}
            className="group bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
          >
            {/* Blog Image */}
            {blog.image && (
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Blog Content */}
            <div className="p-6">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {blog.category}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-800 group-hover:text-gray-600 transition">
                {blog.title}
              </h2>
              <p className="mt-3 text-gray-600 line-clamp-3">
                {blog.content?.substring(0, 120)}...
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex items-center justify-between text-sm text-gray-500">
              <span>By {blog.userId?.email || "Anonymous"}</span>
              <span className="font-medium text-gray-700 group-hover:text-gray-900 transition">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
