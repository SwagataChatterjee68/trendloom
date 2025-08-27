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



 const addToCart = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    toast.error(" Please log in to add products to your cart.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const res = await fetch(`/api/cart/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user._id || user.id, // match backend
        product: slug,             // match backend
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success(" Product added to cart!");
      router.push(`/cart/${user.id}`);
    } else {
      toast.error(`${data.message}`);
    }
  } catch (err) {
    console.error("Add to cart error:", err);
    toast.error(" Something went wrong.");
  } finally {
    setLoading(false);
  }
};



  if (loading) return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <p className="text-center text-black text-xl">Loading products...</p>
    </div>
  );
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

            <div className="flex gap-6">
              <button
                className="mt-4 bg-gray-900 text-white py-3  px-4  rounded-xl hover:bg-gray-700 transition"
                onClick={() => router.push(`/order/${slug}`)}
              >
                Buy Now
              </button>
              <button
                onClick={addToCart}

                disabled={loading}
                className="mt-4 bg-gray-900 text-white py-3  px-4  rounded-xl hover:bg-gray-700 transition disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>

            </div>

          )}
        </div>
      </div>
    </section>
  );
}
