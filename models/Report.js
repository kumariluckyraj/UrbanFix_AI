import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    issue: String,
    location: String,
    image: String,

    // 🔥 NEW: thumbs up count
    thumbsUp: {
      type: Number,
      default: 0,
    },

    // 🔥 OPTIONAL (recommended to prevent spam)
    voters: [
      {
        type: String, // userId or email
      },
    ],

    // 🔥 store FULL AI response
    resultData: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Report ||
  mongoose.model("Report", ReportSchema);