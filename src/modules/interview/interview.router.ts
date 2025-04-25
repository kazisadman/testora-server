import express from "express";
import { interviewController } from "./interview.controller";
import { verifyJWT } from "../user/user.middlewares";

const router = express.Router();

router.post("/generate", verifyJWT, interviewController.createInterview);
router.post("/generate/feedback", verifyJWT, interviewController.userAnswerFeedback);
router.get(
  "/generate/:interviewId",
  verifyJWT,
  interviewController.getInterviewById
);

export default router;
