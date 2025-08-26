import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import User from "@/lib/models/user.model";


export async function GET(req, context) {
  try {
    await connectDB();
    const { slug } = await context.params;

    const product = await Product.findById(slug).populate("userId", "email");

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
