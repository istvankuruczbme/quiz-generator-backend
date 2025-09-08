import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import returnQuizMW from "../middlewares/db/quiz/returnQuizMW";
import getUserQuizSummariesMW from "../middlewares/db/quiz/getUserQuizSummariesMW";
import returnQuizSummariesMW from "../middlewares/db/quiz/returnQuizSummariesMW";
import validateQuizIdMW from "../middlewares/db/quiz/validateQuizIdMW";
import getQuizSummaryMW from "../middlewares/db/quiz/getQuizSummaryMW";
import uploadQuizPhotoMW from "../middlewares/db/quiz/uploadQuizPhotoMW";
import createQuizEmbeddingMW from "../middlewares/db/quiz/createQuizEmbeddingMW";
import createQuizMW from "../middlewares/db/quiz/createQuizMW";
import updateQuizPhotoUrlMW from "../middlewares/db/quiz/updateQuizPhotoUrlMW";
import createQuizConfigMW from "../middlewares/db/quizConfig/createQuizConfigMW";
import validateQuestionsOrderDataMW from "../middlewares/db/question/validateQuestionsOrderDataMW";
import validateQuizQuestionsMW from "../middlewares/db/quiz/validateQuizQuestionsMW";
import updateQuestionsOrderMW from "../middlewares/db/question/updateQuestionsOrderMW";
import updateQuizMW from "../middlewares/db/quiz/updateQuizMW";
import deleteQuizMW from "../middlewares/db/quiz/deleteQuizMW";
import deleteQuizPhotoMW from "../middlewares/db/quiz/deleteQuizPhotoMW";
import sendQuizDeletedResponseMW from "../middlewares/db/quiz/sendQuizDeletedResponseMW";
import deleteQuizQuestionPhotosMW from "../middlewares/db/quiz/deleteQuizQuestionPhotosMW";
import getNumberOfQuizzesCreatedByUserInPeriodMW from "../middlewares/db/quiz/getNumberOfQuizzesCreatedByUserInPeriodMW";
import getUserSubscriptionMW from "../middlewares/db/user/getUserSubscriptionMW";
import checkCreateQuizAccessMW from "../middlewares/db/quiz/checkCreateQuizAccessMW";
import finishQuizMW from "../middlewares/db/quiz/finishQuizMW";
import getSubscriptionFeaturesMW from "../middlewares/stripe/subscription/getSubscriptionFeaturesMW";
import imageUploadMW from "../middlewares/helper/imageUploadMW";
import validateCreateQuizDataMW from "../middlewares/db/quiz/validateCreateQuizDataMW";
import formatCreatedQuizMW from "../middlewares/db/quiz/formatCreatedQuizMW";
import getQuizPrivateMW from "../middlewares/db/quiz/getQuizPrivateMW";
import validateUpdateQuizDataMW from "../middlewares/db/quiz/validateUpdateQuizDataMW";
import formatUpdatedQuizMW from "../middlewares/db/quiz/formatUpdatedQuizMW";
import getQuizPublicMW from "../middlewares/db/quiz/getQuizPublicMW";

const router = Router();

// Add MWs
router.use(authUserMW, getUserMW);

// Get user quizzes
router.get("/my-quizzes", getUserQuizSummariesMW, returnQuizSummariesMW);

// Get quiz with private data
router.get("/:quizId/private", validateQuizIdMW, getQuizPrivateMW, returnQuizMW);

// Get quiz summary
router.get("/:quizId/summary", validateQuizIdMW, getQuizSummaryMW, returnQuizMW);

// Create new quiz
router.post(
	"/",
	getUserSubscriptionMW,
	getSubscriptionFeaturesMW,
	getNumberOfQuizzesCreatedByUserInPeriodMW,
	checkCreateQuizAccessMW,
	imageUploadMW,
	validateCreateQuizDataMW,
	createQuizEmbeddingMW,
	createQuizMW,
	uploadQuizPhotoMW,
	updateQuizPhotoUrlMW,
	createQuizConfigMW,
	formatCreatedQuizMW,
	returnQuizMW
);

// Update quiz data
router.put(
	"/:quizId",
	validateQuizIdMW,
	getQuizPrivateMW,
	imageUploadMW,
	validateUpdateQuizDataMW,
	createQuizEmbeddingMW,
	uploadQuizPhotoMW,
	updateQuizMW,
	formatUpdatedQuizMW,
	returnQuizMW
);

// Update order of questions
router.put(
	"/:quizId/questions",
	validateQuizIdMW,
	getQuizPrivateMW,
	validateQuestionsOrderDataMW,
	validateQuizQuestionsMW,
	updateQuestionsOrderMW,
	returnQuizMW
);

// Finish quiz
router.put("/:quizId/finish", validateQuizIdMW, getQuizPrivateMW, finishQuizMW, returnQuizMW);

// Delete quiz
router.delete(
	"/:quizId",
	validateQuizIdMW,
	getQuizPrivateMW,
	deleteQuizMW,
	deleteQuizPhotoMW,
	deleteQuizQuestionPhotosMW,
	sendQuizDeletedResponseMW
);

export { router as quizRoute };
