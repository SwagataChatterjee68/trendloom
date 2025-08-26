"use client";
import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch(`/api/oders?userId=${user._id || user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-xl shadow-md mt-10 text-black py-20  h-screen">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-900">You have not placed any orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order._id}
              className="p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <p>
                <strong>Product:</strong> {order.productId?.name || "N/A"}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Status:</strong> {order.status || "Pending"}
              </p>
              <p className="text-sm text-gray-900">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
