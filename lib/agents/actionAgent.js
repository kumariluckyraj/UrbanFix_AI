import connectDB from "@/db/connectDb";
import mongoose from "mongoose";
import { embedText } from "../rag/embed"; // 🔥 ADD THIS

export async function actionAgent(data) {
  try {
    const { issue, priority, locationText, decision } = data;

    await connectDB();

    // 🔥 FIX: use SAME collection as vectorSearch
    const collection = mongoose.connection.db.collection("reports");

    // 🔥 Create text for embedding
    const textForEmbedding = `${issue} in ${locationText}`;

    // 🔥 Generate embedding
    const embedding = await embedText(textForEmbedding);

    // 🔥 Safe defaults
    const urgency = decision?.urgency || "low";
    const category = decision?.category || "general";

    // 🔥 Status logic
    const status =
      urgency === "high" || priority?.level === "CRITICAL"
        ? "URGENT"
        : "OPEN";

    // 🔥 Smart department mapping
    let department = category;

    if (category === "general") {
      const lowerIssue = issue.toLowerCase();

      if (lowerIssue.includes("road") || lowerIssue.includes("pothole")) {
        department = "roads";
      } else if (lowerIssue.includes("garbage")) {
        department = "garbage";
      } else if (lowerIssue.includes("water")) {
        department = "water";
      } else if (lowerIssue.includes("drain")) {
        department = "drainage";
      }
    }

    // ✅ FINAL ticket (with embedding 🔥)
    const ticket = {
      issue,
      text: textForEmbedding, // 🔥 IMPORTANT for similarity display
      embedding,              // 🔥 REQUIRED for vector search
      location: locationText,
      priority: priority?.level || "LOW",
      department,
      status,
      explanation: decision?.explanation || "No explanation",
      confidence: priority?.confidence || 0.5,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(ticket);

    console.log("✅ Ticket stored:", result.insertedId);

    if (status === "URGENT") {
      console.log("🚨 Escalation triggered!");
    }

    return {
      assignedDepartment: department,
      status,
      ticketId: result.insertedId,
    };

  } catch (err) {
    console.error("❌ Action Agent Error:", err);

    return {
      assignedDepartment: "general",
      status: "OPEN",
      ticketId: null,
    };
  }
}