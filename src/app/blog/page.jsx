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
    <main className="bg-gray-50 min-h-screen py-20 px-6">
      <h1 className="text-4xl font-bold text-center mb-12">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog._id}`}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold">{blog.title}</h2>
              <p className="mt-2 text-gray-600">{blog.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
