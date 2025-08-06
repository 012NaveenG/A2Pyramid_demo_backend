import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema(
  {
    class: { type: String, required: true },
    subject: { type: String, required: true },
    language: { type: String, required: true },
    questions: [
      // MCQs
      {
        questionText: { type: String, required: true },
        options: {
          A: { type: String, required: true },
          B: { type: String, required: true },
          C: { type: String, required: true },
          D: { type: String, required: true },
        },
        correctAnswer: {
          type: String,
          enum: ["A", "B", "C", "D"],
          required: true,
        },
      },
    ],
    trueFalseQuestions: [
      // ✅ Add this
      {
        questionText: { type: String, required: true },
        correctAnswer: { type: Boolean, required: true }, // true or false
      },
    ],
    fillInTheBlanks: [
      // ✅ Add this
      {
        questionText: { type: String, required: true },
        correctAnswer: { type: String, required: true },
      },
    ],
    generatedBy: {
      type: String,
      default: "AI",
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export { Quiz };
