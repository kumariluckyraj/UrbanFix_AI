import fs from "fs";
import path from "path";
import { pipeline } from "@xenova/transformers";

const IMAGE_FOLDER = path.join(process.cwd(), "plastic-images");
const OUTPUT_FILE = path.join(process.cwd(), "vector-store/plastic-refs.json");

if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
}

async function generateEmbeddings() {
  console.log("⏳ Loading image embedding model (Node backend)...");

  const imageEmbedder = await pipeline("image-feature-extraction", "Xenova/clip-vit-base-patch32", {
    backend: "onnx", // ✅ Node-native backend
  });

  const files = fs.readdirSync(IMAGE_FOLDER).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  if (files.length === 0) {
    console.log("⚠️ No images found in", IMAGE_FOLDER);
    return;
  }

  const refs = [];

  for (const file of files) {
    const filePath = path.join(IMAGE_FOLDER, file);
    console.log("Processing:", file);

    try {
      const embeddingOutput = await imageEmbedder(filePath);

      // Node backend always returns a Float32Array
      let flatEmbedding = Array.isArray(embeddingOutput)
        ? embeddingOutput.flat(Infinity)
        : embeddingOutput.data
        ? Array.from(embeddingOutput.data)
        : Array.from(embeddingOutput.output || []);

      refs.push({ name: file, embedding: flatEmbedding });
      console.log("✅ Embedded:", file, "Length:", flatEmbedding.length);
    } catch (err) {
      console.error(`❌ Failed to process ${file}:`, err);
      refs.push({ name: file, embedding: [] });
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(refs, null, 2));
  console.log("✅ Plastic reference embeddings saved to", OUTPUT_FILE);
}

generateEmbeddings().catch(err => console.error(err));