import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function analyzeIssue({ issue, location, context }) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free, fast, reliable
      messages: [
        {
          role: "user",
          content: `You are an AI civic issue analyzer. Respond ONLY with valid JSON, no extra text.

Issue: ${issue}
Location: ${location}
Similar Past Reports: ${context?.contextText || "None"}

Rules:
- category must be exactly ONE of: roads, garbage, drainage, electricity, water
- urgency must be exactly ONE of: low, medium, high
- Keep explanation under 20 words

Respond ONLY with this exact JSON:
{"category": "", "urgency": "", "explanation": ""}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 150,
    });

    const text = response.choices[0].message.content.trim();
    console.log("RAW OUTPUT:", text);

    const clean = text.replace(/```json|```/g, "").trim();
    const match = clean.match(/\{[\s\S]*?\}/);
    if (!match) throw new Error("No JSON found");

    return JSON.parse(match[0]);

  } catch (err) {
    console.error("❌ AI Error:", err);
    return {
      category: "general",
      urgency: "low",
      explanation: "Fallback decision",
    };
  }
}