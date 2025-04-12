import { Types } from "mongoose";

export interface TInterViewFormData {
  title: string;
  description: string;
  experience: number;
  techStack: string;
  user?: string;
}

export interface TInterviewModel {
  title: string;
  description: string;
  experience: number;
  techStack: string;
  user: Types.ObjectId;
  questions: {
    question: string;
    answer: string;
  }[];
}
