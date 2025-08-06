import { Router } from "express";
import { GenerateQuiz } from "../controllers/quiz.controller.js";



const router = Router();

router.route("/generate").post(GenerateQuiz);

export default router;
