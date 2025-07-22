import { NextResponse } from 'next/server';
import connectDB from '@/db/connectDb';
import Feedback from '@/models/Feedback';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    const feedbackList = await Feedback.find(); // fetch all feedbacks

return NextResponse.json({
  totalEarnings: 0,
  feedback: feedbackList.map(f => f.feedback),
});


    return NextResponse.json({
      totalEarnings: 0, // if needed, calculate from other sources
      feedback: feedbackList.map(f => f.feedback),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch creator data' }, { status: 500 });
  }
}
