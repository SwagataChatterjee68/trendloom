import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";

export async function GET(req, context) {
  await connectDB();

  try {
    const { slug } = await context.params;

    const post = await Post.findById(slug).populate("userId", "email");

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post });
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
