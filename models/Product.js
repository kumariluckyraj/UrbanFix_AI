import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  materials: {
    type: String,
    required: true,
  },

  ecoImpact: {
    type: String,
  },

  artistStory: {
    type: String,
  },

  culturalMeaning: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String, // base64 image
    required: true,
  },

  ecoDecision: {
    type: String, // ECO / NOT_ECO / PARTIAL
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite in Next.js
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);