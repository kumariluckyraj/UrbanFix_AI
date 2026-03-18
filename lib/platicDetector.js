import { index } from "@/lib/pinecone";

// threshold for plastic similarity
const PLASTIC_THRESHOLD = 0.80;

export async function detectPlastic(imageEmbedding) {
  try {
    // Query Pinecone for similar plastic references
    const response = await index.query({
      vector: imageEmbedding,
      topK: 3,
      includeMetadata: true,
    });

    if (!response.matches || response.matches.length === 0) {
      return { isPlastic: false, score: 0 };
    }

    // Find highest scoring match that is labeled as plastic
    let highestScore = 0;
    let isPlastic = false;

    for (const match of response.matches) {
      const score = match.score || 0;
      const label = match.metadata?.type;

      if (label === "plastic" && score > highestScore) {
        highestScore = score;
        isPlastic = true;
      }
    }

    // Final decision
    if (highestScore >= PLASTIC_THRESHOLD) {
      return {
        isPlastic: true,
        score: highestScore,
      };
    }

    return {
      isPlastic: false,
      score: highestScore,
    };
  } catch (err) {
    console.error("Plastic detection error:", err);
    return { isPlastic: false, score: 0 };
  }
}