import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Paper } from "../models/paper.model.js";
import { geminiGeneratePaper } from "../helper/PaperGenerator.js";

const GeneratePaper = AsyncHandler(async (req, res) => {
  const {
    subject,
    selectedClass,
    numQuestions,
    questionType,
    board,
    language,
  } = req.body;

  // Validation
  if (
    !subject ||
    !selectedClass ||
    !numQuestions ||
    !questionType ||
    !language
  ) {
    throw new ApiError(400, "Missing required fields");
  }

  // 1. Fetch existing questions
  const existingPapers = await Paper.find({
    class: selectedClass,
    subject,
    questionType,
    language,
  });

  const alreadyExistsQuestions = existingPapers.flatMap((paper) =>
    paper.questions.map((q) => q.questionText)
  );

  // 2. Generate paper using Gemini
  const generatedText = await geminiGeneratePaper(
    subject,
    selectedClass,
    numQuestions,
    questionType,
    board,
    language,
    alreadyExistsQuestions
  );

  // 3. Parse text to extract questions from generatedText
  const lines = generatedText.split("\n").map((line) => line.trim());
  const questions = lines
    .filter((line) => /^\d+[\.\)]\s+/.test(line)) // lines starting with number + dot/paren
    .map((line) => ({
      questionText: line.replace(/^\d+[\.\)]\s+/, ""), // remove numbering
    }));

  if (questions.length === 0) {
    throw new ApiError(400, "No valid questions generated");
  }

  // 4. Save to DB
  const paper = await Paper.create({
    class: selectedClass,
    subject,
    questionType,
    language,
    questions,
    generatedBy: "AI",
  });

  // 5. Return success
  return res
    .status(201)
    .json(
      new ApiResponse(201, paper, "Paper generated and saved successfully")
    );
});

export { GeneratePaper };
