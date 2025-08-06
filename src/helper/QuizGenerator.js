import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUBJECT_PROMPTS } from "./GeminiPrompts.js";

const geminiGenerateQuiz = async (
  subject,
  selectedClass,
  board,
  language,
  questionTypes,
  alreadyExistsQuestions = []
) => {
  const subjectPromptTemplate = SUBJECT_PROMPTS[subject?.toLowerCase()];
  if (!subjectPromptTemplate) {
    console.error(`Prompt not found for subject: ${subject}`);
    return null;
  }

  const existingQuestionsFormatted = alreadyExistsQuestions.length
    ? `\n\nAvoid generating any of the following ${
        alreadyExistsQuestions.length
      } questions again. These are already used:\n${alreadyExistsQuestions
        .map((q, i) => `Q${i + 1}: ${q.questionText}`)
        .join("\n")}\n\nBe creative and ensure no duplication.`
    : "";

  const prompt = `
${subjectPromptTemplate
  .replace("{className}", selectedClass)
  .replace("{board}", board)}

Generate a question paper for Class ${selectedClass} ${subject.toUpperCase()} with exactly:
- ${questionTypes.mcq} Multiple Choice Questions (MCQs) with 4 options each
- ${questionTypes.trueFalse} True/False Questions
- ${questionTypes.fillBlanks} Fill in the Blanks Questions

Follow these formatting rules:
1. Start with: "Class ${selectedClass} - ${board} ${subject.toUpperCase()} Question Paper"
2. Divide the paper into three sections:
   Section A: Multiple Choice Questions (label options as (a), (b), (c), (d))
   Section B: True/False Questions
   Section C: Fill in the Blanks

3. Number questions continuously (1, 2, 3...) within each section
4. Ensure 4 well-differentiated options for MCQs
5. Use underscore (____) for blank in fill in the blanks
6. Use ${language} language. Translate key technical terms where needed
7. Use age-appropriate content for Class ${selectedClass}
8. Follow ${board} examination pattern
9. ***DO NOT include or reword any of the already existing questions listed below.***

${existingQuestionsFormatted}
`;

  try {
    const apiKey = process.env.GEMINI_API1;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const result = await model.generateContent(prompt);
    const responseText = result?.response?.text();

    return responseText || null;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export { geminiGenerateQuiz };
