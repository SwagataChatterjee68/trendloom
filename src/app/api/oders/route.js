import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Order from "@/lib/models/oder.model";
import User from "@/lib/models/user.model";
import Product from "@/lib/models/product.model";

// Create new order
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { userId, productId, quantity } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const order = await Order.create({ userId, productId, quantity });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order Create Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

//  Get all orders (Admin Dashboard)
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find()
      .populate("userId", "email")
      .populate("productId", "name price");

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Order Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
