import { Router } from "express";
import { imageUpload } from "../config/multer";
import validateQuizDataMW from "../middlewares/db/quiz/validateQuizDataMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import uploadQuizPhotoMW from "../middlewares/db/quiz/uploadQuizPhotoMW";
import createQuizEmbeddingMW from "../middlewares/db/quiz/createQuizEmbeddingMW";
import createQuizMW from "../middlewares/db/quiz/createQuizMW";
import updateQuizPhotoMW from "../middlewares/db/quiz/updateQuizPhotoMW";
import createQuizConfigMW from "../middlewares/db/quizConfig/createQuizConfigMW";
import returnQuizMW from "../middlewares/db/quiz/returnQuizMW";
import getUserQuizzesMW from "../middlewares/db/quiz/getUserQuizzesMW";
import returnQuizzesMW from "../middlewares/db/quiz/returnQuizzesMW";
import validateQuizIdMW from "../middlewares/db/quiz/validateQuizIdMW";
import getQuizMW from "../middlewares/db/quiz/getQuizMW";
import authUserMW from "../middlewares/auth/authUserMW";

const router = Router();

// Add authentication middlewares
router.use(authUserMW);

// Get user quizzes
router.get("/user/:userId", getUserMW, getUserQuizzesMW, returnQuizzesMW);

// Get quiz
router.get("/:quizId", getUserMW, validateQuizIdMW, getQuizMW, returnQuizMW);

// Create new quiz
router.post(
	"/",
	getUserMW,
	imageUpload.single("file"),
	validateQuizDataMW,
	createQuizEmbeddingMW,
	createQuizMW,
	uploadQuizPhotoMW,
	updateQuizPhotoMW,
	createQuizConfigMW,
	returnQuizMW
);

export { router as quizRoute };
