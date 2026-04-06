import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import Report from "@/models/Report";

export async function POST(req) {
  try {
    await connectDB();

    const { id, status } = await req.json();

    const updated = await Report.findByIdAndUpdate(
      id,
      {
        "resultData.action.status": status, // 🔥 update nested field
      },
      { new: true }
    );

    return NextResponse.json({ success: true, report: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}