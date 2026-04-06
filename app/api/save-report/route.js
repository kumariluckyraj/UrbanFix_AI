import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import Report from "@/models/Report";

// 🔥 Generate Ticket ID
const generateTicketId = () => {
  return "UF-" + Math.floor(100000 + Math.random() * 900000);
};

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // 🔥 Ensure resultData exists
    if (!body.resultData) {
      return NextResponse.json({
        success: false,
        error: "Missing resultData",
      });
    }

    // 🔥 Override ticketId (ignore frontend value)
    const updatedResultData = {
      ...body.resultData,
      action: {
        ...body.resultData.action,
        ticketId: generateTicketId(), // ✅ always generated here
      },
    };

    const newReport = await Report.create({
      issue: body.issue,
      location: body.location,
      image: body.image,
      resultData: updatedResultData,
    });

    return NextResponse.json({
      success: true,
      report: newReport,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      error: "Save failed",
    });
  }
}