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
import getUserQuizSummariesMW from "../middlewares/db/quiz/getUserQuizSummariesMW";
import returnQuizSummariesMW from "../middlewares/db/quiz/returnQuizSummariesMW";
import validateQuizIdMW from "../middlewares/db/quiz/validateQuizIdMW";
import getQuizMW from "../middlewares/db/quiz/getQuizMW";
import authUserMW from "../middlewares/auth/authUserMW";
import getQuizQueryTypeMW from "../middlewares/db/quiz/getQuizQueryTypeMW";

const router = Router();

// Add authentication middlewares
router.use(authUserMW);

// Add getUserMW
router.use(getUserMW);

// Get user quizzes
router.get("/user/:userId", getUserQuizSummariesMW, returnQuizSummariesMW);

// Get quiz
router.get("/:quizId", validateQuizIdMW, getQuizQueryTypeMW, getQuizMW, returnQuizMW);

// Create new quiz
router.post(
	"/",
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
