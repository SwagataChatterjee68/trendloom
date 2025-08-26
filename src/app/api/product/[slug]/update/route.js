// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db/db";
// import Product from "@/lib/models/product.model";
// import User from "@/lib/models/user.model";

// export async function PUT(req, { params }) {
  
//   try {
//     await connectDB();
//     const body = await req.json();
//     const product = await Product.findByIdAndUpdate(params.slug, body, { new: true });

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json(product, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }


// src/app/api/posts/[slug]/route.js (PUT handler)
import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import jwt from "jsonwebtoken";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const product = await Product.findByIdAndUpdate(params.slug, body, { new: true });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

