// app/api/delete-product/route.js
import connectDB from "@/db/connectDb";
import Product from "@/models/Product";

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return new Response(JSON.stringify({ success: false, error: "Product ID is required" }), { status: 400 });
    }

    await connectDB();

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return new Response(JSON.stringify({ success: false, error: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: "Product deleted" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Failed to delete product" }), { status: 500 });
  }
}