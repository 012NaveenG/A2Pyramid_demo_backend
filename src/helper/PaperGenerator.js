import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUBJECT_PROMPTS } from "./GeminiPrompts.js";

async function geminiGeneratePaper(
  subject,
  selectedClass,
  numQuestions,
  questionType,
  board,
  language,
  alreadyExistsQuestions = []
) {
  // Validate subject prompt
  const subjectPromptTemplate = SUBJECT_PROMPTS[subject?.toLowerCase()];
  if (!subjectPromptTemplate) {
    throw new Error(
      `Prompt for subject "${subject}" not found in SUBJECT_PROMPTS.`
    );
  }

  // Format existing questions to help avoid duplication
  const existingQuestionsFormatted = alreadyExistsQuestions.length
    ? `\n\nThese questions are already present. DO NOT repeat or slightly modify them:\n${alreadyExistsQuestions
        .map((q, i) => `${i + 1}. ${q}`)
        .join("\n")}\n`
    : "";

  const prompt = `
${subjectPromptTemplate.replace(/{className}/g, selectedClass)}

Generate exactly ${numQuestions} ${questionType} answer type questions following these rules:
1. Start with a clear heading: "Class ${selectedClass} - ${
    board || "Standard"
  } ${subject.toUpperCase()} Question Paper"
2. Number each question clearly (1, 2, 3, etc.)
3. Include age-appropriate content for Class ${selectedClass} students
4. Questions should be suitable for ${questionType} answers
5. Use simple and clear language appropriate for Class ${selectedClass}
6. Use plain text notation for mathematical expressions
7. Do NOT include answers or solutions
8. Match ${board || "Standard"} examination pattern
9. Provide all text in ${language} language
10. For technical terms, provide ${language} translation in brackets if needed
${existingQuestionsFormatted}
`;

  try {
    const apiKey = process.env.GEMINI_API1;
    if (!apiKey)
      throw new Error("Missing Gemini API key in environment variables.");

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      responseMimeType: "text/plain",
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error.message || error);
    return "Failed to generate paper. Please try again.";
  }
}

export { geminiGeneratePaper };
