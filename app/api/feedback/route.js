// app/api/feedback/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/db/connectDb';
import Feedback from '@/models/Feedback';

export async function POST(req) {
  try {
    await connectDB();
    const { email, feedback } = await req.json();

    if (!email || !feedback) {
      return NextResponse.json({ error: 'Missing email or feedback' }, { status: 400 });
    }

    const newFeedback = new Feedback({ email, feedback });
    await newFeedback.save();

    return NextResponse.json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('API ERROR:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
