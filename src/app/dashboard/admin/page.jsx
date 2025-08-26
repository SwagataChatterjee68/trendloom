"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/oders");
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const res = await axios.put(`/api/orders/${orderId}`, { status });
      if (res.data.success) {
        toast.success(`Order ${status}`);
        fetchOrders(); // refresh list
      }
    } catch (error) {
      console.error("Update Order Error:", error);
      toast.error("Failed to update order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Orders Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-center">
              <td className="p-2 border">{order._id}</td>
              <td className="p-2 border">{order.userId?.email}</td>
              <td className="p-2 border">{order.productId?.name}</td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">
                {order.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(order._id, "approved")}
                      className="px-3 py-1 bg-green-600 text-white rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(order._id, "rejected")}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
