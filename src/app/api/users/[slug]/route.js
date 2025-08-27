import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import User from "@/lib/models/user.model";
import bcrypt from "bcryptjs";
export async function PUT(req, context) {
  try {
    await connectDB();
    const { slug } = await context.params;
    const body = await req.json();
    const { username, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updateData = {};
    if (username) updateData.username = username;
    if (password) updateData.password = hashedPassword;

    const updatedUser = await User.findByIdAndUpdate(slug, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();
    const { slug } = await context.params;
    const deletedUser = await User.findByIdAndDelete(slug);
    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, user: deletedUser });
  } catch (error) {
    console.error("Delete User Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
