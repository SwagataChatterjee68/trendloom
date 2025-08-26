"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function BlogDetailPage() {
  const { slug } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/posts/${slug}`);
        if (res.data.success) {
          setBlog(res.data.post);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found</p>;

  return (
    <main className="bg-white min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-32">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          {blog.title}
        </h1>
        <p className="mt-4 text-lg text-gray-800">
          {blog.category} · By {blog.userId?.email || "Anonymous"}
        </p>
        {blog.image && (
          <div className="mt-8 rounded-2xl overflow-hidden shadow-md">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[600px] object-cover"
            />
          </div>
        )}
        <div className="mt-10 prose prose-lg prose-gray text-gray-800 max-w-none leading-relaxed">
          {blog.content}
        </div>
      </article>
    </main>
  );
}
