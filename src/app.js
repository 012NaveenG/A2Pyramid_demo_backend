import Express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = Express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.send("AI Education API is running");
});

// Routes
import paperRoutes from "./routes/paper.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
app.use("/api/v1/paper", paperRoutes);
app.use("/api/v1/quiz", quizRoutes);
