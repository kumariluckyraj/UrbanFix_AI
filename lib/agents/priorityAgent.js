export async function priorityAgent(issue, context) {
  try {
    const text = issue.toLowerCase();

    // 🔥 1. Estimate severity from keywords
    let severity = 0.3; // default

    if (
      text.includes("large") ||
      text.includes("major") ||
      text.includes("severe")
    ) {
      severity = 0.7;
    }

    if (
      text.includes("accident") ||
      text.includes("danger") ||
      text.includes("traffic") ||
      text.includes("blocked")
    ) {
      severity = 0.9;
    }

    // 🔥 2. Frequency score (RAG-based)
    const frequencyScore = Math.min(
      (context.avgSimilarity || 0) * (context.pastFrequency / 5),
      1
    );

    // 🔥 3. Final weighted score
    let score = 0;
    score += severity * 0.6;
    score += frequencyScore * 0.4;

    score = Math.min(score, 1);

    // 🔥 4. Level classification
    let level = "LOW";
    if (score > 0.75) level = "CRITICAL";
    else if (score > 0.45) level = "MEDIUM";

    // 🔥 5. Explanation
    let explanation = "";

    if (level === "CRITICAL") {
      explanation = "High severity issue with strong contextual recurrence.";
    } else if (level === "MEDIUM") {
      explanation = "Moderate severity or recurring issue.";
    } else {
      explanation = "Low impact and less frequent issue.";
    }

    return {
      score,
      level,
      confidence: context.avgSimilarity || 0.5,
      explanation,
    };

  } catch (err) {
    console.error("❌ Priority Agent Error:", err);

    return {
      score: 0,
      level: "LOW",
      confidence: 0,
      explanation: "Fallback due to error",
    };
  }
}