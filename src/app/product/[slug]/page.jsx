"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SingleProductPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // 👈 store user here

  useEffect(() => {
    // ✅ Load user from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // ✅ Fetch product
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${slug}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.message || "Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/product/${slug}/delete`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        router.push("/product");
        toast.success("Product deleted successfully");
      } else {
        setError(data.message || "Failed to delete product");
      }
    } catch (err) {
      setError("Failed to delete product");
      toast.error("Failed to delete product");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="w-full md:w-1/2 relative h-96 md:h-auto">
          {product.image && (
            <div className="mt-8 rounded-2xl overflow-hidden shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[600px] object-cover"
              />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-2 text-gray-600 font-semibold">${product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <p className="mt-4 text-gray-500 text-sm">
            Category: {product.category}
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            Added by: {product.userId?.email || "Anonymous"}
          </p>

          {/* 👇 Show Edit/Delete ONLY for admins */}
          {user?.role === "admin" && (
            <>
              <button
                onClick={() => router.push(`/product/${slug}/edit`)}
                className="mt-6 bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-700 transition"
              >
                Edit Product
              </button>

              <button
                onClick={handleDelete}
                className="mt-4 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
              >
                Delete Product
              </button>
            </>
          )}

          {/* 👇 Show Buy Now for normal users */}
          {user?.role === "user" && (
            <button
              className="mt-4 bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-700 transition"
              onClick={() => router.push("/order")}
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
