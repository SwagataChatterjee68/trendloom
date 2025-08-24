// src/app/api/posts/create-post/route.js
import connectDB from "@/lib/db/db";
import Post from "@/lib/models/post.model";
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

    const userId = decoded.id; // userId from token

    // 3. Get blog data from request
    const { title, category, content,image } = await req.json();

    if (!title || !category || !content) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // 4. Create blog post with userId
    const newPost = await Post.create({
      title,
      category,
      content,
      userId,
      image
    });

    return NextResponse.json(
      { success: true, message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Post Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
