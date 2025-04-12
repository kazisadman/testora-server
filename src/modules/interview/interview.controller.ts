import { chatSession } from "../../script/ai-studio";
import asyncHandler from "../../utils/asyncHandler";
import errorHandler from "../../utils/errorHandler";
import responseHandler from "../../utils/responseHandler";
import { TInterViewFormData } from "./interview.interface";
import { interviewService } from "./interview.service";
import { interviewFormDataValidate } from "./interview.validator";

const cleanResponseText = (responseText: string) => {
  let cleanText = responseText.trim();

  cleanText = cleanText.replace(/(json|```|`)/g, "");

  const jsonArrayMatch = cleanText.match(/\[[\s\S]*\]/);

  if (jsonArrayMatch) {
    cleanText = jsonArrayMatch[0];
  } else {
    throw new errorHandler(404, "No JSON array found in response");
  }
  try {
    return JSON.parse(cleanText);
  } catch (error) {
    throw new errorHandler(
      400,
      "Invalid JSON format: " + (error as Error)?.message
    );
  }
};

const generateAiResult = async (data: TInterViewFormData) => {
  const { title, description, experience, techStack } = data;

  const formData = { title, description, experience, techStack };

  const validatedData = interviewFormDataValidate.parse(formData);

  const prompt = `
            As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

            [
              { "question": "<Question text>", "answer": "<Answer text>" },
              ...
            ]

            Job Information:
            - Job Position: ${validatedData?.title}
            - Job Description: ${validatedData?.description}
            - Years of Experience Required: ${validatedData?.experience}
            - Tech Stacks: ${validatedData?.techStack}

            The questions should assess skills in ${validatedData?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
            `;
  const aiResult = await chatSession.sendMessage(prompt);
  const cleanDataResponse = cleanResponseText(aiResult.response.text().trim());
  return cleanDataResponse;
};

const createInterview = asyncHandler(async (req, res) => {
  const { title, description, experience, techStack, user } = req.body;
  const formData = { title, description, experience, techStack };
  const questions = await generateAiResult(formData);

  const payload = {
    title,
    description,
    experience,
    techStack,
    user,
    questions,
  };
  const result = await interviewService.createInterviewInDb(payload);

  res
    .status(200)
    .json(
      new responseHandler(200, true, result, "Interview Created Successfully")
    );
});

const getInterviewById = asyncHandler(async (req, res) => {
  const { interviewId } = req.params;

  const result = await interviewService.getInterviewByIdInDb(interviewId);
  if (!result) {
    throw new errorHandler(404, "Interview data not found");
  }

  res
    .status(200)
    .json(
      new responseHandler(
        200,
        true,
        result,
        "Interview data fetched Successfully"
      )
    );
});

export const interviewController = { createInterview, getInterviewById };
