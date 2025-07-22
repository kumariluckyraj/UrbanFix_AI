import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PaymentSchema = new Schema(
  {
    name: { type: String, required: true }, // buyer's name
    to_user: { type: String, required: true }, // creator username
    creatorEmail: { type: String, required: true }, // for dashboard
    oid: { type: String, required: true }, // Razorpay order ID
    message: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    feedback: { type: String }, // optional buyer feedback
    done: { type: Boolean, default: false },
  },
  { timestamps: true } // auto adds createdAt and updatedAt
);

export default mongoose.models.Payment || model("Payment", PaymentSchema);
