import { NextResponse } from "next/server";

import { contextAgent } from "@/lib/agents/contextAgent";
import { priorityAgent } from "@/lib/agents/priorityAgent";
import { analyzeIssue } from "@/lib/ai/model";
import { actionAgent } from "@/lib/agents/actionAgent";

export async function POST(req) {
  try {
    const body = await req.json();

    const { issue, location } = body;

    if (!issue || !location) {
      return NextResponse.json(
        { error: "Missing issue or location" },
        { status: 400 }
      );
    }

    console.log("🚀 New Report Received");

    // 🧠 1. Context Agent (RAG)
    const contextResult = await contextAgent(issue, location);
    console.log("📚 Context:", contextResult);

    // 🚨 2. Duplicate Detection (NEW)
    const topMatch = contextResult.similarCases[0];
    let isDuplicate = false;

    if (topMatch && topMatch.score > 0.9) {
      console.log("⚠️ Duplicate detected:", topMatch.text);
      isDuplicate = true;
    }

    // 🧠 3. Priority Agent
    const priorityResult = await priorityAgent(issue, contextResult);

    // 🔥 Boost priority if duplicate (smart system)
    if (isDuplicate) {
      priorityResult.score = Math.min(priorityResult.score + 0.1, 1);
      priorityResult.level =
        priorityResult.score > 0.75
          ? "CRITICAL"
          : priorityResult.score > 0.45
          ? "MEDIUM"
          : "LOW";
    }

    console.log("⚡ Priority:", priorityResult);

    // 🧠 4. Decision Agent (LLM)
    const decision = await analyzeIssue({
      issue,
      location,
      context: contextResult,
    });
    console.log("🤖 Decision:", decision);

    // ⚙️ 5. Action Agent
    const actionResult = await actionAgent({
      issue,
      priority: priorityResult,
      locationText: location,
      decision,
      isDuplicate, // 🔥 pass this
    });
    console.log("🎯 Action:", actionResult);

    // ✅ FINAL RESPONSE
    return NextResponse.json({
      success: true,
      data: {
        context: contextResult,
        priority: priorityResult,
        decision,
        action: actionResult,
        duplicate: isDuplicate, // 🔥 extra info
        ...(isDuplicate && {
          similarTo: {
            text: topMatch.text,
            score: topMatch.score,
          },
        }),
      },
    });

  } catch (error) {
    console.error("❌ REPORT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}