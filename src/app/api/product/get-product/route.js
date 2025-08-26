import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Product from "@/lib/models/product.model";



export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
   
    return NextResponse.json({ success: true, products });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}



