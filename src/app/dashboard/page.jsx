"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const manageOrder = () => {
    
    router.push("/dashboard/admin");
  }

  const handleLogout = async () => {
    await fetch("/api/users/logout", { method: "POST" });
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  const isAdmin = user.role === "admin";

  return (
    <div className="flex min-h-screen bg-gray-100 py-20 text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "profile" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
            }`}
          >
            Profile
          </button>

          {isAdmin ? (
            <>
              <button
                onClick={manageOrder}

                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "manageOrders" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                }`}
              >
                Manage Orders
              </button>
              <button
                onClick={() => setActiveTab("manageProducts")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "manageProducts" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                }`}
              >
                Manage Products
              </button>
              <button
                onClick={() => setActiveTab("manageBlogs")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "manageBlogs" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                }`}
              >
                Manage Blogs
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab("myOrders")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "myOrders" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                }`}
              >
                My Orders
              </button>
            </>
          )}

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">My Profile</h3>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>
          </div>
        )}

        {isAdmin && activeTab === "manageOrders" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Manage Orders</h3>
            <p className="text-gray-600">Admin can approve/reject orders here...</p>
          </div>
        )}

        {isAdmin && activeTab === "manageProducts" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Manage Products</h3>
            <p className="text-gray-600">Admin can add/edit/delete products here...</p>
          </div>
        )}

        {isAdmin && activeTab === "manageBlogs" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Manage Blogs</h3>
            <p className="text-gray-600">Admin can add/edit/delete blogs here...</p>
          </div>
        )}

        {!isAdmin && activeTab === "myOrders" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">My Orders</h3>
            <p className="text-gray-600">User's order list will appear here...</p>
          </div>
        )}
      </main>
    </div>
  );
}
