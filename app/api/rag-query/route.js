export const runtime = "nodejs";
import fs from "fs";
import path from "path";
import { pipeline } from "@xenova/transformers";

// ✅ Use WASM backend (no native modules)
const llm = await pipeline("text-generation", "Xenova/gpt2", { backend: "wasm" });
const textEmbedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", { backend: "wasm" });

// Cosine similarity helper
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question) {
      return new Response(JSON.stringify({ error: "Question is required" }), { status: 400 });
    }

    // Load vector store
    const storePath = path.join(process.cwd(), "vector-store/products.json");
    if (!fs.existsSync(storePath)) {
      return new Response(JSON.stringify({ error: "No products found" }), { status: 404 });
    }
    const products = JSON.parse(fs.readFileSync(storePath));

    // 1️⃣ Embed the user question
    const questionEmbedding = (await textEmbedder(question)).flat();

    // 2️⃣ Find top 3 relevant products
    const ranked = products
      .map((p) => ({
        ...p,
        score: cosineSimilarity(questionEmbedding, p.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // 3️⃣ Build context for the LLM
    let contextText = ranked
      .map(
        (p, i) =>
          `Product ${i + 1}:\nName: ${p.name}\nDescription: ${p.description}\nMaterials: ${p.materials}\nEcoImpact: ${p.ecoImpact}\nArtistStory: ${p.artistStory}\nCulturalMeaning: ${p.culturalMeaning}\n`
      )
      .join("\n");

    const prompt = `You are a sustainable craft expert. Answer the following question using only the products listed below. Be concise and informative.\n\n${contextText}\n\nQuestion: ${question}\nAnswer:`;

    // 4️⃣ Generate answer
    const result = await llm(prompt, { max_new_tokens: 200 });
    const answer = Array.isArray(result) ? result[0].generated_text : result.generated_text;

    return new Response(JSON.stringify({ answer: answer.trim(), topProducts: ranked }), { status: 200 });
  } catch (error) {
    console.error("RAG Query Error:", error);
    return new Response(JSON.stringify({ error: "Failed to query products" }), { status: 500 });
  }
}