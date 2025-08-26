"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const fetchMyOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      const res = await axios.get("/api/orders");
      if (res.data.success) {
        // filter only user’s orders
        setOrders(res.data.orders.filter(o => o.userId?._id === user.id));
      }
    } catch (error) {
      console.error("Fetch My Orders Error:", error);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      <ul>
        {orders.map((o) => (
          <li key={o._id} className="p-2 border mb-2 rounded">
            Product: {o.productId?.name} <br />
            Status: <span className="font-semibold">{o.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
