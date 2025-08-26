"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

export default function EditProductPage() {
    const { slug } = useParams(); // ✅ matches [id] in route
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },

    } = useForm();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/product/${slug}`);
                const data = await res.json();
                if (data.success) {
                    reset(data.product);
                }
            } catch (err) {
                toast.error("Failed to fetch product");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);
    const onSubmit = async (data) => {
        try {
            const res = await axios.put(`/api/product/${slug}/update`, data);
            console.log("Updated product:", res.data);
            router.push("/product"); // redirect after success
        } catch (error) {
            console.error("Error updating product:", error.response?.data || error);
        }
    };
    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <section className="min-h-screen text-gray-800 flex items-center justify-center py-20 bg-gray-50">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-center mb-6">Edit Product</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block font-medium">Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {errors.name && <span className="text-red-500">Name is required</span>}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block font-medium">Price</label>
                        <input
                            type="number"
                            {...register("price", { required: true })}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {errors.price && <span className="text-red-500">Price is required</span>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-medium">Category</label>
                        <select
                            {...register("category", { required: true })}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option value="">Select Category</option>
                            <option value="electronics">electronics</option>
                            <option value="clothing">clothing</option>
                            <option value="accessories">accessories</option>
                            <option value="books">books</option>
                            <option value="jewelry">jewelry</option>
                        </select>
                        {errors.category && <span className="text-red-500">Category is required</span>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium">Description</label>
                        <textarea
                            {...register("description", { required: true })}
                            rows={5}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {errors.description && <span className="text-red-500">Description is required</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-700"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </section>
    );
}
