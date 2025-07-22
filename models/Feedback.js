import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },
  feedback: { type: String, required: true },
  productId: { type: String }, // optional
}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
