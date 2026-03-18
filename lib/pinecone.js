import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

export const index = pc.Index("eco-products");