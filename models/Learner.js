import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LearnerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  region: { type: String },
  course_interest: { type: String },
  learning_goals: { type: String },
  previous_experience: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Learner || model("Learner", LearnerSchema);