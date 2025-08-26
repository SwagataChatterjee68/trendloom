"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function OrderPage({ productId }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        payment: "cod",
        quantity: 1,
    });
    const [loading, setLoading] = useState(false);

    // Get logged-in user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem("user")); // get logged-in user
            if (!user) {
                toast.error("You must be logged in to place an order");
                return;
            }

            const res = await fetch("/api/oders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,       // ✅ user ID
                    productId,             // ✅ product ID passed as prop
                    quantity: 1,           // optional, default is 1
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    payment: formData.payment,
                }),
            });

            const data = await res.json();
            if (data.success) {
                toast.success("✅ Your order has been placed successfully!");
            } else {
                toast.error(data.message || "Failed to place order");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error, try again");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
                    Checkout <span className="text-gray-500">Your Order</span>
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-gray-600">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Delivery Address</label>
                        <textarea
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            min={1}
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-600">Payment Method</label>
                        <select
                            name="payment"
                            value={formData.payment}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            <option value="cod">Cash on Delivery</option>
                            <option value="card">Credit / Debit Card</option>
                            <option value="upi">UPI / Net Banking</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl transition"
                    >
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>
                </form>
            </div>
        </div>
    );
}
