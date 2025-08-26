// // src/app/api/posts/create-post/route.js
// import connectDB from "@/lib/db/db";
// import Product from "@/lib/models/product.model";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     await connectDB();

//     // 1. Read token from cookies
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json(
//         { success: false, message: "User not logged in" },
//         { status: 401 }
//       );
//     }

//     // 2. Verify token
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       return NextResponse.json(
//         { success: false, message: "Invalid token" },
//         { status: 401 }
//       );
//     }

//     const userId = decoded.id; // userId from token

//     // 3. Get blog data from request
//     const { name,description, category,  price,image,slug } = await req.json();

//     if (!name || !category || !description || !price || !image ) {
//       return NextResponse.json(
//         { success: false, message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // 4. Create blog post with userId
//     const newProduct = await Product.create({
//       name,
//       category,
//       description,
//       userId,
//       price,
//       image,
//       slug
//     });

//     return NextResponse.json(
//       { success: true, message: "Product created successfully", product: newProduct },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Create product Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }



// src/app/api/posts/create-post/route.js
import connectDB from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    // 1. Read token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "User not logged in" },
        { status: 401 }
      );
    }

    // 2. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // 3. Role check
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Only admin can create product" },
        { status: 403 }
      );
    }

    // 4. Get product data
    const { name, description, category, price, image, slug } = await req.json();
    if (!name || !category || !description || !price || !image) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // 5. Create product
    const newProduct = await Product.create({
      name,
      category,
      description,
      price,
      image,
      slug,
      userId: decoded.id,
    });

    return NextResponse.json(
      { success: true, message: "Product created successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
