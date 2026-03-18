
export const runtime = "nodejs";

import connectDB from "@/db/connectDb";
import Order from "@/models/Orders";

export async function POST(req) {
  try {
    const data = await req.json();
    await connectDB();

    const order = await Order.create(data);

    return new Response(JSON.stringify({ success: true, order }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}