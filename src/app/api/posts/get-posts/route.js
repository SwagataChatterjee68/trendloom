import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";


export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find()
      .populate("userId", "email") // will now work
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, posts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}



