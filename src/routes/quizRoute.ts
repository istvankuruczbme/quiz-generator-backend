import { Router } from "express";
import { imageUpload } from "../config/multer";
import validateQuizDataMW from "../middlewares/db/quiz/validateQuizDataMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import uploadQuizPhotoMW from "../middlewares/db/quiz/uploadQuizPhotoMW";
import createQuizEmbeddingMW from "../middlewares/db/quiz/createQuizEmbeddingMW";
import createQuizMW from "../middlewares/db/quiz/createQuizMW";
import updateQuizPhotoUrlMW from "../middlewares/db/quiz/updateQuizPhotoUrlMW";
import createQuizConfigMW from "../middlewares/db/quizConfig/createQuizConfigMW";
import returnQuizMW from "../middlewares/db/quiz/returnQuizMW";
import getUserQuizSummariesMW from "../middlewares/db/quiz/getUserQuizSummariesMW";
import returnQuizSummariesMW from "../middlewares/db/quiz/returnQuizSummariesMW";
import validateQuizIdMW from "../middlewares/db/quiz/validateQuizIdMW";
import getQuizMW from "../middlewares/db/quiz/getQuizMW";
import authUserMW from "../middlewares/auth/authUserMW";
import validateQuestionsOrderDataMW from "../middlewares/db/question/validateQuestionsOrderDataMW";
import validateQuizQuestionsMW from "../middlewares/db/quiz/validateQuizQuestionsMW";
import updateQuestionsOrderMW from "../middlewares/db/question/updateQuestionsOrderMW";
import sendQuizUpdatedResponseMW from "../middlewares/db/quiz/sendQuizUpdatedResponseMW";
import getQuizSummaryMW from "../middlewares/db/quiz/getQuizSummaryMW";
import validateUserQuizMW from "../middlewares/db/quiz/validateUserQuizMW";

const router = Router();

// Add authentication middlewares
router.use(authUserMW);

// Add getUserMW
router.use(getUserMW);

// Get user quizzes
router.get("/my-quizzes", getUserQuizSummariesMW, returnQuizSummariesMW);

// Get quiz with private data
router.get("/:quizId", validateQuizIdMW, getQuizMW, validateUserQuizMW, returnQuizMW);

// Get quiz summary
router.get("/:quizId/summary", validateQuizIdMW, getQuizSummaryMW, returnQuizMW);

// Create new quiz
router.post(
	"/",
	imageUpload.single("file"),
	validateQuizDataMW,
	createQuizEmbeddingMW,
	createQuizMW,
	uploadQuizPhotoMW,
	updateQuizPhotoUrlMW,
	createQuizConfigMW,
	returnQuizMW
);

// Update order of questions
router.put(
	"/:quizId/questions",
	validateQuizIdMW,
	getQuizMW,
	validateQuestionsOrderDataMW,
	validateQuizQuestionsMW,
	updateQuestionsOrderMW,
	sendQuizUpdatedResponseMW
);

export { router as quizRoute };
