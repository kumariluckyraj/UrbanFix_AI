import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const collection = mongoose.connection.db.collection("admins");

    // 🔥 Find admin in DB
    const admin = await collection.findOne({ email });

    if (!admin) {
      return NextResponse.json({ success: false });
    }

    // ⚠️ Plain password check (for now)
    if (admin.password !== password) {
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({
      success: true,
      message: "Admin login successful",
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}