import { Router } from "express";
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
import validateQuizWriteActionMW from "../middlewares/db/quiz/validateQuizWriteActionMW";
import validateQuizConfigDataMW from "../middlewares/db/quizConfig/validateQuizConfigDataMW";
import updateQuizConfigMW from "../middlewares/db/quizConfig/updateQuizConfigMW";
import updateQuizMW from "../middlewares/db/quiz/updateQuizMW";
import deleteQuizMW from "../middlewares/db/quiz/deleteQuizMW";
import deleteQuizPhotoMW from "../middlewares/db/quiz/deleteQuizPhotoMW";
import sendQuizDeletedResponseMW from "../middlewares/db/quiz/sendQuizDeletedResponseMW";
import deleteQuizQuestionPhotosMW from "../middlewares/db/quiz/deleteQuizQuestionPhotosMW";
import removeQuizPhotoUrlMW from "../middlewares/db/quiz/removeQuizPhotoUrlMW";
import getNumberOfQuizzesCreatedByUserMW from "../middlewares/db/quiz/getNumberOfQuizzesCreatedByUserMW";
import getUserSubscriptionMW from "../middlewares/db/user/getUserSubscriptionMW";
import validateCreateQuizAccessMW from "../middlewares/db/quiz/validateCreateQuizAccessMW";
import finishQuizMW from "../middlewares/db/quiz/finishQuizMW";
import validateQuizReadActionMW from "../middlewares/db/quiz/validateQuizReadActionMW";
import getSubscriptionFeaturesMW from "../middlewares/stripe/subscription/getSubscriptionFeaturesMW";
import imageUploadMW from "../middlewares/helper/imageUploadMW";

const router = Router();

// Add authentication middlewares
router.use(authUserMW);

// Add getUserMW
router.use(getUserMW);

// Get user quizzes
router.get("/my-quizzes", getUserQuizSummariesMW, returnQuizSummariesMW);

// Get quiz with private data
router.get("/:quizId", validateQuizIdMW, getQuizMW, validateQuizWriteActionMW, returnQuizMW);

// Get quiz summary
router.get(
	"/:quizId/summary",
	validateQuizIdMW,
	getQuizSummaryMW,
	validateQuizReadActionMW,
	returnQuizMW
);

// Create new quiz
router.post(
	"/",
	getUserSubscriptionMW,
	getSubscriptionFeaturesMW,
	getNumberOfQuizzesCreatedByUserMW,
	validateCreateQuizAccessMW,
	imageUploadMW,
	validateQuizDataMW,
	createQuizEmbeddingMW,
	createQuizMW,
	uploadQuizPhotoMW,
	updateQuizPhotoUrlMW,
	createQuizConfigMW,
	returnQuizMW
);

// Update quiz data
router.put(
	"/:quizId",
	validateQuizIdMW,
	getQuizMW,
	validateQuizWriteActionMW,
	imageUploadMW,
	validateQuizDataMW,
	createQuizEmbeddingMW,
	uploadQuizPhotoMW,
	updateQuizMW,
	updateQuizPhotoUrlMW,
	sendQuizUpdatedResponseMW
);

// Update quiz config
router.put(
	"/:quizId/config",
	validateQuizIdMW,
	getQuizMW,
	validateQuizWriteActionMW,
	validateQuizConfigDataMW,
	updateQuizConfigMW,
	sendQuizUpdatedResponseMW
);

// Update order of questions
router.put(
	"/:quizId/questions",
	validateQuizIdMW,
	getQuizMW,
	validateQuizWriteActionMW,
	validateQuestionsOrderDataMW,
	validateQuizQuestionsMW,
	updateQuestionsOrderMW,
	sendQuizUpdatedResponseMW
);

// Finish quiz
router.put(
	"/:quizId/finish",
	validateQuizIdMW,
	getQuizMW,
	validateQuizWriteActionMW,
	finishQuizMW,
	sendQuizUpdatedResponseMW
);

// Delete quiz photo
router.delete(
	"/:quizId/photo",
	validateQuizIdMW,
	getQuizMW,
	validateQuizWriteActionMW,
	deleteQuizPhotoMW,
	removeQuizPhotoUrlMW,
	sendQuizUpdatedResponseMW
);

// Delete quiz
router.delete(
	"/:quizId",
	validateQuizIdMW,
	getQuizMW,
	validateQuizWriteActionMW,
	deleteQuizMW,
	deleteQuizPhotoMW,
	deleteQuizQuestionPhotosMW,
	sendQuizDeletedResponseMW
);

export { router as quizRoute };
