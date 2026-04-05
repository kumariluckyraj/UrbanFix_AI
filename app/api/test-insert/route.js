import connectDB from "@/db/connectDb";
import mongoose from "mongoose";
import { embedText } from "@/lib/rag/embed";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { location, issue } = body;

    // Create text for embedding
    const text = `${location} ${issue}`;

    // Generate embedding
    const embedding = await embedText(text);

    const collection = mongoose.connection.db.collection("reports");

    const result = await collection.insertOne({
      text,
      location,
      issue,
      embedding,
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      insertedId: result.insertedId,
    });

  } catch (err) {
    console.error(err);
    return Response.json({ success: false, error: err.message });
  }
}