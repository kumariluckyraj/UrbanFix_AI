import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  username: { type: String, required: true },
  profilepic: { type: String },
  coverpic: { type: String },
  Razorpayid: { type: String },
  razorpaysecret: { type: String },

  // New fields for Dashboard form
  region: { type: String },
  craft: { type: String },
  experience: { type: String },
  bio: { type: String },
  portfolio: { type: String },

  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

// Automatically update `updateAt` on every save
UserSchema.pre("save", function (next) {
  this.updateAt = Date.now();
  next();
});

export default mongoose.models.User || model("User", UserSchema);