"use client";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/product/create-product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    price,
                    category,
                    description,
                    image,
                    slug: name
                }),
            });
            if (res.ok) {
                toast.success("Product Created Successfully!");
                router.push("/product");
            }



        } catch (error) {
            toast.error("Failed to create product")
        }
    };

    return (
        <section className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto flex">
                {/* Left Image Section */}
                <div className="hidden md:flex w-xl relative">
                    <Image
                        src="/product1.avif"
                        alt="Product showcase"
                        fill
                        className="object-cover rounded-3xl shadow-lg"
                        priority
                    />
                    <div className="absolute inset-0 rounded-r-3xl"></div>
                    <div className="absolute bottom-10 left-10 text-white max-w-xs">
                        <h2 className="text-3xl font-bold">Add Your Product</h2>
                    </div>
                </div>

                {/* Right Form Section */}
                <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
                        <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
                            Create a <span className="text-gray-500">New Product</span>
                        </h1>
                        <p className="text-center text-gray-500 mb-8">
                            Add details of your product to showcase it.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Product Name */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-600 focus:ring-gray-400 focus:border-gray-400 outline-none"
                                    required
                                />
                            </div>

                            {/* Product Image */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Product Image URL
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-600 focus:ring-gray-400 focus:border-gray-400 outline-none"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="electronics">electronics</option>
                                    <option value="clothing">clothing</option>
                                    <option value="accessories">accessories</option>
                                    <option value="books">books</option>
                                    <option value="jewelry">jewelry</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter product price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-600 focus:ring-gray-400 focus:border-gray-400 outline-none"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Write product description..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-600 focus:ring-gray-400 focus:border-gray-400 outline-none"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition"
                            >
                                Create Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
