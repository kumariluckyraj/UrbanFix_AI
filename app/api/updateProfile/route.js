// app/api/updateProfile/route.js
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, name, username, region, craft, experience, bio, portfolio } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name,
        username,
        region,
        craft,
        experience,
        bio,
        portfolio,
        updatedAt: new Date(),
      },
      { new: true, upsert: true } // create if doesn't exist
    );

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.error("Error updating profile:", err);
    return new Response(
      JSON.stringify({ error: "Failed to update profile" }),
      { status: 500 }
    );
  }
}