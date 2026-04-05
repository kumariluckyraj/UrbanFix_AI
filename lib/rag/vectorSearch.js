import connectDB from "@/db/connectDb";
import mongoose from "mongoose";

export async function searchSimilar(queryVector) {
  await connectDB();

  const collection = mongoose.connection.db.collection("reports");

  const results = await collection.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryVector,
        numCandidates: 50,
        limit: 5
      }
    },
    {
      $project: {
        text: 1,
        issue: 1,
        score: { $meta: "vectorSearchScore" }
      }
    }
  ]).toArray();

  return results;
}