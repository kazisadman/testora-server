import mongoose, { Schema } from "mongoose";
import { TInterviewModel } from "./interview.interface";

const interviewSchema = new Schema<TInterviewModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    techStack: { type: String, required: true },
    questions: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    experience: { type: Number, required: true },
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
