import { Router } from "express";
import { GeneratePaper } from "../controllers/paper.controller.js";

const router = Router();

router.route("/generate").post(GeneratePaper);

export default router;
