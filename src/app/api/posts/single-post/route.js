import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Post from "@/lib/models/post.model";

export async function GET(req, { params }) {
  await connectDB();

  try {
    const { id } = params;

    const post = await Post.findById(id).populate("userId", "email");

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
