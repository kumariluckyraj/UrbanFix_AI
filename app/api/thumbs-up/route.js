import { NextResponse } from "next/server";
import Issue from "@/models/Report";

export async function POST(req) {
  try {
    const { issueId } = await req.json();

    const issue = await Issue.findById(issueId);

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    issue.thumbsUp += 1;
    await issue.save();

    return NextResponse.json({
      success: true,
      thumbsUp: issue.thumbsUp,
    });

  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}