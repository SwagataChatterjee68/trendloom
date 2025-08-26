// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db/db";
// import Product from "@/lib/models/product.model";
// import User from "@/lib/models/user.model";


// export async function DELETE(req, context) {
//   try {
//     await connectDB();
//     const { slug } = await context.params;

//     const product = await Product.findByIdAndDelete(slug).populate("userId", "email");

//     if (!product) {
//       return NextResponse.json(
//         { success: false, message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, product });
//   } catch (err) {
//     console.error("Error fetching post:", err);
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }


// src/app/api/posts/[slug]/route.js (DELETE handler)
import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import jwt from "jsonwebtoken";

export async function DELETE(req, { params }) {
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

    const product = await Product.findByIdAndDelete(params.slug).populate("userId", "email");

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("Delete product error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
