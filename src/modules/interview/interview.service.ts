import { Types } from "mongoose";
import errorHandler from "../../utils/errorHandler";
import { TInterviewModel } from "./interview.interface";
import Interview from "./interview.model";

const createInterviewInDb = async (payload: TInterviewModel) => {
  const result = await Interview.create(payload);
  if (result) {
    return result;
  } else {
    throw new errorHandler(
      500,
      "Something went wrong while creating interview."
    );
  }
};

const getInterviewByIdInDb = async (payload: string) => {
  const result = await Interview.findById({ _id: payload })
  return result;
};
export const interviewService = { createInterviewInDb,getInterviewByIdInDb };
