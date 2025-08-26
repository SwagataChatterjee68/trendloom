import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Order from "@/lib/models/oder.model";

// 📌 Update order status (approve / reject)
export async function PUT(req, { params }) {
  try {
    await connectDB ();
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Order Update Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
