import { HfInference } from "@huggingface/inference";
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function analyzeIssue({ issue, location, context }) {
  try {
    const prompt = `
You are an AI civic system.

Issue: ${issue}
Location: ${location}

Similar Past Reports:
${context?.contextText || "None"}

Rules:
- Choose ONE category:
  roads, garbage, drainage, electricity, water
- urgency must be one of: low, medium, high
- DO NOT say "uncertain"

Respond ONLY with valid JSON:
{
  "category": "",
  "urgency": "",
  "explanation": ""
}
`;

    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.2,
      },
    });

    const text = response[0]?.generated_text;

    console.log("RAW OUTPUT:", text);

    let parsed;

    try {
      const match = text?.match(/\{[\s\S]*?\}/);
      if (!match) throw new Error("No JSON found");

      let jsonString = match[0];

      // 🔥 Fix common JSON issues
      jsonString = jsonString
        .replace(/(\w+):/g, '"$1":')
        .replace(/:\s*([a-zA-Z]+)/g, ':"$1"');

      parsed = JSON.parse(jsonString);

    } catch (e) {
      console.error("❌ JSON Parse Error:", e);
      throw e;
    }

    return parsed;

  } catch (err) {
    console.error("❌ AI Error:", err);

    return {
      category: "general",
      urgency: "low",
      explanation: "Fallback decision",
    };
  }
}