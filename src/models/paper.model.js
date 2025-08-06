import mongoose, { Schema } from "mongoose";

const paperSchema = new Schema(
  {
    class: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    questionType: {
      type: String, // "short", "long", etc.
      required: true,
    },
    language: {
      type: String, // "english", "hindi", etc.
      required: true,
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
      },
    ],
    generatedBy: {
      type: String,
      default: "AI",
    },
  },
  { timestamps: true }
);

const Paper = mongoose.model("Paper", paperSchema);

export { Paper };
