"use client";
import { useState,useEffect } from "react";

export default function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user")); // adjust if using auth context

      const res = await fetch(`/api/cart/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add to cart.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(`/api/cart/${user._id}`);
      const data = await res.json();

      if (data.success) {
        const mappedItems = data.cart.map((item) => ({
          id: item._id,
          productId: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity,
        }));
        setCartItems(mappedItems);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, []);


  return (
    <div className="p-4 border rounded-lg shadow">
      <img src={product.image|| "https://via.placeholder.com/150"} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={addToCart}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
