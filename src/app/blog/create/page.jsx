"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter()
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  await fetch("/api/posts/create-post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      title,
      category,
      content,
      image,
      slug:title
    }),
  });
  toast.success("Post Created Successfully")
  router.push("/blog")

};

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      {/* Left Image Section */}
      <div className="max-w-7xl mx-auto flex">
        <div className="hidden md:flex w-xl relative  ">
          <Image
            src="/blog.avif"
            alt="Fashion inspiration"
            fill
            className="object-cover rounded-3xl shadow-lg"
            priority
          />
          <div className="absolute inset-0 rounded-r-3xl"></div>
          <div className="absolute bottom-10 left-10 text-white max-w-xs">
            <h2 className="text-3xl font-bold">Share Your Style</h2>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Create a <span className="text-gray-500">New Blog</span>
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Write your story and inspire the fashion world
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Blog Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-600  focus:ring-gray-400 focus:border-gray-400 outline-none"
                  required
                />
              </div>

              {/* Blog Image */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Blog Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-600  focus:ring-gray-400 focus:border-gray-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="trends">Trends</option>
                  <option value="style-guide">Style Guide</option>
                  <option value="sustainability">Sustainability</option>
                  <option value="reviews">Reviews</option>
                </select>
              </div>


              {/* Blog Content */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Blog Content
                </label>
                <textarea
                  name="content"
                  placeholder="Write your blog content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border text-gray-600 border-gray-300  focus:ring-gray-400 focus:border-gray-400 outline-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition"
              >
                Publish Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
