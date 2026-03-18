// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  buyerName: { type: String, required: true },
  buyerEmail: { type: String },
  buyerPhone: { type: String, required: true },
  location: { type: String },
  paymentId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);