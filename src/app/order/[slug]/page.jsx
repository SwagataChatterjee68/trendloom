"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function OrderPage() {
    const router = useRouter();
    const { slug } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        payment: "cash",
        quantity: 1,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please login to place an order");
            return;
        }

        const orderPayload = {
            userId: user._id || user.id,
            productId: slug,
            quantity: formData.quantity,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            payment: formData.payment,
        };

        console.log("Submitting Order:", orderPayload);

        try {
            const res = await fetch("/api/oders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload),
            });

            const data = await res.json();
            console.log("Order Response:", data);

            if (data.success) {
                toast.success("Order Placed Successfully");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    payment: "cash",
                    quantity: 1,
                })
                router.push("/");
            } else {
                alert(data.message || "Failed to place order");
            }
        } catch (error) {
            console.error("Order Submit Error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 text-black">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-semibold text-gray-800">Place Order</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
                <textarea
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    min="1"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <select
                    name="payment"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                >
                    <option value="cash">Cash on Delivery</option>
                    <option value="card">Card Payment</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
}
