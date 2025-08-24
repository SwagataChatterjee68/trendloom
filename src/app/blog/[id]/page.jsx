"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, notFound } from "next/navigation";

export default function BlogDetailPage() {
  const { id } = useParams(); // Get ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${window.location.origin}/api/posts/single-post/${id}`
        );
        if (res.data.success) {
          setBlog(res.data.post);
        } else {
          notFound();
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found</p>;

  return (
    <main className="bg-white min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-20">
        {/* Blog Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          {blog.title}
        </h1>

        {/* Short Description */}
        <p className="mt-4 text-lg text-gray-800">
          {blog.category} · By {blog.userId?.email || "Anonymous"}
        </p>

        {/* Blog Image */}
        {blog.image && (
          <div className="mt-8 rounded-2xl overflow-hidden shadow-md">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="mt-10 prose prose-lg prose-gray text-gray-800 max-w-none leading-relaxed">
          {blog.content}
        </div>
      </article>
    </main>
  );
}
