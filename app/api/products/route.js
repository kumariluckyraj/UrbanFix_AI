// app/api/products/route.js (or pages/api/products.js if using pages directory)
export const runtime = "nodejs";

import connectDB from "@/db/connectDb";
import Product from "@/models/Product";

// GET /api/products
export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all products, sorted by newest first
    const products = await Product.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify({ success: true, products }), {
      status: 200,
    });
  } catch (error) {
    console.error("Fetch Products Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Failed to fetch products" }),
      { status: 500 }
    );
  }
}