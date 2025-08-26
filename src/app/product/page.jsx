"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/product/get-product");
        console.log(res.data); // check the API response
        // Adjust based on how your API returns products
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (res.data.success && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading products...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (products.length === 0)
    return <p className="text-center mt-20">No products found.</p>;

  return (
    <main className="bg-gray-100 min-h-screen py-20 px-6">
      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
          Our <span className="text-gray-600">Products</span>
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Explore our latest collection of products.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
            className="group bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
          >
            {/* Product Image */}
            {product.image && (
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-96 h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Product Content */}
            <div className="p-6">
              <h2 className="mt-2 text-2xl font-bold text-gray-800 group-hover:text-gray-600 transition">
                {product.name}
              </h2>
              <p className="mt-3 text-gray-600 font-semibold">
                ${product.price}
              </p>
              <p className="mt-2 text-gray-500 text-sm line-clamp-2">
                {product.description?.substring(0, 100) ||
                  "No description available"}
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex items-center justify-between text-sm text-gray-500">
              <span className="font-medium text-gray-700 group-hover:text-gray-900 transition">
                View Details →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
