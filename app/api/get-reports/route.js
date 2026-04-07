import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import Report from "@/models/Report";

export async function GET() {
  try {
    await connectDB();

    const reports = await Report.find().sort({ createdAt: -1 });

    return NextResponse.json({ reports });
  } catch (err) {
  console.error("get-reports error:", err);
  return NextResponse.json({ error: err.message }, { status: 500 });
}
}