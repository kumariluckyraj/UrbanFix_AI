import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { index } from "../lib/pinecone.js";
import { pipeline } from "@xenova/transformers";

// ✅ Flatten embedding safely
function flattenEmbedding(output) {
  if (!output) return [];
  if (Array.isArray(output)) return output.flat(Infinity);
  if (output.data) {
    if (Array.isArray(output.data)) return output.data.flat(Infinity);
    if (output.data instanceof Float32Array) return Array.from(output.data);
  }
  return [];
}

const run = async () => {
  try {
    console.log("🚀 Starting upload...");

    // 🔍 Check existing index stats
    try {
      const stats = await index.describeIndexStats();
      console.log("INDEX STATS:", stats);
    } catch (err) {
      console.error("INDEX ERROR:", err.message);
    }

    // Load image embedder
    const imageEmbedder = await pipeline(
      "image-feature-extraction",
      "Xenova/clip-vit-base-patch32",
      { backend: "wasm" }
    );

    const folderPath = path.join(process.cwd(), "plastic-samples");

    if (!fs.existsSync(folderPath)) {
      console.log("❌ Folder 'plastic-samples' not found");
      return;
    }

    const files = fs.readdirSync(folderPath);

    if (files.length === 0) {
      console.log("❌ No images found in plastic-samples");
      return;
    }

    for (const file of files) {
      try {
        const filePath = path.join(folderPath, file);
        console.log("\n📸 Processing:", file);

        // Generate embedding
        const embeddingOutput = await imageEmbedder(filePath);

        // Flatten and sanitize
        const rawEmbedding = flattenEmbedding(embeddingOutput);
        const embedding = Array.from(rawEmbedding)
          .flat(Infinity)
          .filter(val => typeof val === "number" && !isNaN(val));

        // Ensure correct length
        if (embedding.length !== 384) {
          console.log(`❌ Skipped ${file}: embedding length ${embedding.length} ≠ 384`);
          continue;
        }

        // ✅ Upsert into Pinecone
        await index.upsert({
          vectors: [
            {
              id: `plastic-${file}`,
              values: embedding,
              metadata: { type: "plastic", name: file }
            }
          ],
        });

        console.log("✅ Uploaded:", file);

      } catch (err) {
        console.log("❌ Error processing file:", file);
        console.error(err.message);
      }
    }

    console.log("\n🎉 ALL DONE: Plastic dataset uploaded!");

  } catch (err) {
    console.error("❌ Fatal Error:", err.message);
  }
};

run();