import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Quiz } from "../models/quiz.models.js";
import { geminiGenerateQuiz } from "../helper/QuizGenerator.js";

const parseGeminiQuizResponse = (responseText) => {
  const sections = {
    questions: [], // MCQs
    trueFalseQuestions: [],
    fillInTheBlanks: [],
  };

  const sectionA = responseText
    .split("**Section A: Multiple Choice Questions**")[1]
    ?.split("**Section B: True/False Questions**")[0];
  const sectionB = responseText
    .split("**Section B: True/False Questions**")[1]
    ?.split("**Section C: Fill in the Blanks**")[0];
  const sectionC = responseText.split("**Section C: Fill in the Blanks**")[1];

  // 🟡 MCQs Parsing
  const mcqRegex =
    /(\d+)\.\s+(.*?)\n\s*\(a\)\s+(.*?)\n\s*\(b\)\s+(.*?)\n\s*\(c\)\s+(.*?)\n\s*\(d\)\s+(.*?)(?=\n\d+\.|\n\n|\n\*\*|$)/gs;
  let match;
  while ((match = mcqRegex.exec(sectionA)) !== null) {
    const [, , questionText, a, b, c, d] = match;
    sections.questions.push({
      questionText: questionText.trim(),
      options: {
        A: a.trim(),
        B: b.trim(),
        C: c.trim(),
        D: d.trim(),
      },
      correctAnswer: "A", // Default/fallback – replace with logic if answer available
    });
  }

  // 🟡 True/False Parsing
  const tfLines = sectionB?.trim().split("\n").filter(Boolean);
  tfLines?.forEach((line) => {
    const match = line.match(/^\d+\.\s+(.*?)(?:\s*\((true|false)\))?$/i);
    if (match) {
      const [, questionText, answer] = match;
      sections.trueFalseQuestions.push({
        questionText: questionText.trim(),
        correctAnswer: answer?.toLowerCase() === "true", // default: undefined
      });
    }
  });

  // 🟡 Fill in the Blanks Parsing
  const fillLines = sectionC?.trim().split("\n").filter(Boolean);
  fillLines?.forEach((line) => {
    const match = line.match(/^\d+\.\s+(.*?)(?:\s*\((.*?)\))?$/);
    if (match) {
      const [, questionText, answer] = match;
      sections.fillInTheBlanks.push({
        questionText: questionText.trim(),
        correctAnswer: answer || "Answer", // fallback
      });
    }
  });

  return sections;
};

const GenerateQuiz = AsyncHandler(async (req, res) => {
  const { subject, selectedClass, board, language, questionTypes } = req.body;

  if (!subject || !selectedClass || !board || !language || !questionTypes) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingQuestions = await Quiz.find({ class: selectedClass });

  const responseText = await geminiGenerateQuiz(
    subject,
    selectedClass,
    board,
    language,
    questionTypes,
    existingQuestions
  );

  if (!responseText) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to generate quiz."));
  }
  const parsed = parseGeminiQuizResponse(responseText);
 
  const savedQuiz = await Quiz.create({
    class: selectedClass,
    subject,
    language,
    questions: parsed.questions,
    trueFalseQuestions: parsed.trueFalseQuestions,
    fillInTheBlanks: parsed.fillInTheBlanks,
    generatedBy: "AI",
  });

  res
    .status(200)
    .json(new ApiResponse(200, savedQuiz, "Quiz generated successfully"));
});

export { GenerateQuiz };
