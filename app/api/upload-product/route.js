export const runtime = "nodejs";

import fs from "fs";
import path from "path";
import { index } from "@/lib/pinecone";
import connectDB from "@/db/connectDb";
import Product from "@/models/Product";
// -------------------- Helpers --------------------
function averageEmbedding(tensor) {
  if (!tensor || !tensor.data || !tensor.dims) return [];

  const dims = tensor.dims;
  const data = tensor.data;

  if (dims.length === 2) {
    return Array.from(data);
  }

  if (dims.length === 3) {
    const tokens = dims[1];
    const dim = dims[2];
    const avg = new Array(dim).fill(0);

    for (let t = 0; t < tokens; t++) {
      for (let d = 0; d < dim; d++) {
        avg[d] += data[t * dim + d];
      }
    }

    return avg.map((v) => v / tokens);
  }

  return [];
}

// -------------------- Load Models --------------------
let textEmbedder, imageClassifier, llmPipeline;

async function loadPipelines() {
  if (!textEmbedder) {
    const { pipeline } = await import("@xenova/transformers");

    textEmbedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L12-v2",
      { backend: "cpu" }
    );

    imageClassifier = await pipeline(
      "zero-shot-image-classification",
      "Xenova/clip-vit-base-patch32",
      { backend: "cpu" }
    );

    // LLM only for explanation
    llmPipeline = await pipeline(
      "text-generation",
      "Xenova/distilgpt2",
      { backend: "cpu" }
    );
  }

  return { textEmbedder, imageClassifier, llmPipeline };
}

// -------------------- MAIN API --------------------
export async function POST(req) {
  try {
    const { textEmbedder, imageClassifier, llmPipeline } =
      await loadPipelines();

    const data = await req.json();

    const {
      name,
      description,
      materials,
      ecoImpact,
      artistStory,
      culturalMeaning,
      price,
      imageBase64,
    } = data;

    if (!name || !description || !materials || !imageBase64) {
      return new Response(
        JSON.stringify({ error: "All required fields missing" }),
        { status: 400 }
      );
    }

    // -------------------- TEXT EMBEDDING --------------------
    const textEmbeddingRaw = await textEmbedder(
      description + " " + materials
    );
    const textEmbedding = averageEmbedding(textEmbeddingRaw);

    if (textEmbedding.length !== 384) {
      return new Response(
        JSON.stringify({
          error: `Embedding mismatch: ${textEmbedding.length} != 384`,
        }),
        { status: 500 }
      );
    }

    // -------------------- IMAGE PROCESS --------------------
    const tempPath = path.join(process.cwd(), `temp-${Date.now()}.png`);
    const base64Data = imageBase64.replace(
      /^data:image\/\w+;base64,/,
      ""
    );
    fs.writeFileSync(tempPath, base64Data, "base64");

    const labels = [
      "plastic object",
      "ceramic clay pottery",
      "wooden handmade object",
      "metal object",
      "glass object",
      "eco friendly handmade product",
    ];

    const result = await imageClassifier(tempPath, labels);
    fs.unlinkSync(tempPath);

    const plasticScore =
      result.find((r) => r.label === "plastic object")?.score || 0;

    const isPlastic = plasticScore > 0.4;

    let allowSubmit = true;
    let plasticWarning = "";

    if (isPlastic) {
      allowSubmit = false;
      plasticWarning = `⚠️ Image suggests plastic material (confidence: ${plasticScore.toFixed(
        2
      )})`;
    }

    // -------------------- MATERIAL CHECK --------------------
    const materialsText = materials.toLowerCase();

    if (isPlastic && materialsText.includes("clay")) {
      plasticWarning +=
        "\n⚠️ Mismatch: Image looks plastic but materials say clay.";
      allowSubmit = false;
    }

    // -------------------- STORE IN PINECONE --------------------
    await index.upsert([
      {
        id: Date.now().toString(),
        values: textEmbedding,
        metadata: {
          name,
          description,
          materials,
          ecoImpact,
          artistStory,
          culturalMeaning,
          price,
        },
      },
    ]);

    // -------------------- RAG RETRIEVAL --------------------
    const queryResponse = await index.query({
      vector: textEmbedding,
      topK: 5,
      includeMetadata: true,
    });

    const topResults = queryResponse.matches.map((m) => ({
      text: m.metadata?.description || "No description",
      score: m.score,
    }));

    const contextText = topResults
      .map((k, i) => `Knowledge ${i + 1}: ${k.text}`)
      .join("\n");

    // -------------------- DECISION --------------------
    let ecoDecision = "UNKNOWN";

    

    if (isPlastic) {
      ecoDecision = "NOT_ECO";
    } else if (
      materialsText.includes("clay") ||
      materialsText.includes("wood") ||
      materialsText.includes("bamboo") ||
      materialsText.includes("natural")
    ) {
      ecoDecision = "ECO";
    } else if (
      materialsText.includes("metal") ||
      materialsText.includes("glass")
    ) {
      ecoDecision = "PARTIAL";
    }

    // -------------------- SAVE TO MONGODB --------------------
if (allowSubmit && ecoDecision !== "NOT_ECO") {
  await connectDB();

  await Product.create({
    name,
    description,
    materials,
    ecoImpact,
    artistStory,
    culturalMeaning,
    price: Number(price),
    image: imageBase64,
    ecoDecision,
  });

}

    // -------------------- LLM EXPLANATION --------------------
    const prompt = `
Explain in 2-3 short lines why this product is ${ecoDecision}.

Product: ${description}
Materials: ${materials}
Context: ${contextText}
`;

    const ragResult = await llmPipeline(prompt, {
      max_new_tokens: 60,
      temperature: 0.5,
    });

    let generatedText = Array.isArray(ragResult)
      ? ragResult[0].generated_text
      : ragResult.generated_text;

    let explanation = generatedText.replace(prompt, "").trim();

    // fallback
    if (!explanation || explanation.length < 20) {
      if (ecoDecision === "NOT_ECO") {
        explanation =
          "This product is not eco-friendly because it likely contains plastic which harms the environment.";
      } else if (ecoDecision === "ECO") {
        explanation =
          "This product is eco-friendly as it uses natural and sustainable materials.";
      } else if (ecoDecision === "PARTIAL") {
        explanation =
          "This product is partially eco-friendly since materials like metal or glass are recyclable.";
      } else {
        explanation =
          "Eco-friendliness cannot be determined from the given information.";
      }
    }

    // -------------------- FINAL CLEAN OUTPUT --------------------
    const ecoAnalysis = `
Decision: ${ecoDecision}

Context:
${contextText}

Product:
Name: ${name}
Description: ${description}
Materials: ${materials}

Explanation:
${explanation}

${plasticWarning ? plasticWarning : ""}

Related Knowledge:
${topResults.map((k) => k.text).join("\n")}

${allowSubmit ? "✅ Eco-friendly. Can submit." : "❌ Not eco-friendly. Cannot submit."}
`.trim();

    // -------------------- RESPONSE --------------------
    return new Response(
      JSON.stringify({
        success: true,
        ecoAnalysis,
        relatedKnowledge: topResults,
        allowSubmit,
        plasticInfo: {
          isPlastic,
          score: plasticScore,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload Error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Failed to process product",
      }),
      { status: 500 }
    );
  }
}