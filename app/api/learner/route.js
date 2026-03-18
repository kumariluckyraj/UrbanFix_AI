import connectDB from "@/db/connectDb";
import Learner from "@/models/Learner";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, name, username, region, course_interest, learning_goals, previous_experience } = body;

    if (!email || !name || !username) {
      return new Response(JSON.stringify({ error: "Email, Name, and Username are required" }), { status: 400 });
    }

    const updatedLearner = await Learner.findOneAndUpdate(
      { email },
      {
        name,
        username,
        region,
        course_interest,
        learning_goals,
        previous_experience,
        updatedAt: new Date(),
      },
      { new: true, upsert: true } // create if doesn't exist
    );

    return new Response(JSON.stringify(updatedLearner), { status: 200 });
  } catch (err) {
    console.error("Error saving learner:", err);
    return new Response(JSON.stringify({ error: "Failed to register learner" }), { status: 500 });
  }
}