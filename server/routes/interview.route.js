import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { analyzeResume, finishInterview, submitAnswer, generateQuestions, getMyInterviews, getInterviewReport } from "../controllers/interview.controller.js";
import { upload } from "../middlewares/multer.js"
import { get } from "http";
const interviewRouter = express.Router();

interviewRouter.post("/upload", isAuth, upload.single("resume"), analyzeResume)
interviewRouter.post("/generate-questions", isAuth, generateQuestions);
interviewRouter.post("/submit-answer", isAuth, submitAnswer);
interviewRouter.post("/finish", isAuth, finishInterview);
interviewRouter.get("/get-interview", isAuth, getMyInterviews);
interviewRouter.get("/report/:id", isAuth, getInterviewReport);
export default interviewRouter;