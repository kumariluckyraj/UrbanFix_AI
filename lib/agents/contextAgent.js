import { embedText } from "../rag/embed";
import { searchSimilar } from "../rag/vectorSearch";

export async function contextAgent(issue, locationText) {
  try {
    // 🔥 Better query
    const query = `${issue} in ${locationText}`;

    // 🔹 Step 1: Embed
    const embedding = await embedText(query);
    if (!embedding) throw new Error("Embedding failed");

    // 🔹 Step 2: Search
    const similarCases = await searchSimilar(embedding);

    // 🔹 Step 3: Build context
    const contextText = similarCases
      .map((c, i) => `${i + 1}. ${c.text}`)
      .join("\n");

    return {
      similarCases,
      contextText,
      pastFrequency: similarCases.length,
      avgSimilarity:
        similarCases.length > 0
          ? similarCases.reduce((acc, cur) => acc + cur.score, 0) /
            similarCases.length
          : 0,
    };

  } catch (err) {
    console.error("❌ Context Agent Error:", err);

    return {
      similarCases: [],
      contextText: "",
      pastFrequency: 0,
      avgSimilarity: 0,
    };
  }
}