import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import { imageUpload, quizFileUpload } from "../config/multer";
import validateQuizIdMW from "../middlewares/db/quiz/validateQuizIdMW";
import createQuestionMW from "../middlewares/db/question/createQuestionMW";
import createQuestionPointsMW from "../middlewares/db/questionPoints/createQuestionPointsMW";
import createAnswerOptionsMW from "../middlewares/db/answerOption/createAnswerOptionsMW";
import uploadQuestionPhotoMW from "../middlewares/db/question/uploadQuestionPhotoMW";
import updateQuestionPhotoUrlMW from "../middlewares/db/question/updateQuestionPhotoUrlMW";
import returnQuestionMW from "../middlewares/db/question/returnQuestionMW";
import validateQuestionDataMW from "../middlewares/db/question/validateQuestionDataMW";
import validateQuestionIdMW from "../middlewares/db/question/validateQuestionIdMW";
import getQuestionMW from "../middlewares/db/question/getQuestionMW";
import deleteQuestionMW from "../middlewares/db/question/deleteQuestionMW";
import deleteQuestionPhotoMW from "../middlewares/db/question/deleteQuestionPhotoMW";
import sendQuestionDeletedResponseMW from "../middlewares/db/question/sendQuestionDeletedResponseMW";
import getQuizMW from "../middlewares/db/quiz/getQuizMW";
import validateQuizQuestionMW from "../middlewares/db/question/validateQuizQuestionMW";
import validateQuizWriteActionMW from "../middlewares/db/quiz/validateQuizWriteActionMW";
import reorderQuizQuestionsMW from "../middlewares/db/quiz/reorderQuizQuestionsMW";
import updateQuestionMW from "../middlewares/db/question/updateQuestionMW";
import updateQuestionPointsMW from "../middlewares/db/questionPoints/updateQuestionPointsMW";
import updateAnswerOptionsMW from "../middlewares/db/answerOption/updateAnswerOptionsMW";
import sendQuestionUpdatedResponseMW from "../middlewares/db/question/sendQuestionUpdatedResponseMW";
import removeQuestionPhotoUrlMW from "../middlewares/db/question/removeQuestionPhotoUrlMW";
import getUserSubscriptionMW from "../middlewares/db/user/getUserSubscriptionMW";
import validateCreateQuestionAccessMW from "../middlewares/db/question/validateCreateQuestionAccessMW";
import getDocumentTextMW from "../middlewares/db/question/generation/getDocumentTextMW";
import createChunksMW from "../middlewares/db/question/generation/createChunksMW";
import validateQuestionsGenerationDataMW from "../middlewares/db/question/generation/validateQuestionsGenerationDataMW";
import selectChunksMW from "../middlewares/db/question/generation/selectChunksMW";
import generateQuestionsMW from "../middlewares/db/question/generation/generateQuestionsMW";
import getSubscriptionFeaturesMW from "../middlewares/stripe/subscription/getSubscriptionFeaturesMW";
import parseRequestBodyMW from "../middlewares/helper/parseRequestBodyMW";
import createGeneratedQuestionsMW from "../middlewares/db/question/generation/createGeneratedQuestionsMW";
import uploadQuizDocumentMW from "../middlewares/db/quiz/uploadQuizDocumentMW";
import sendQuizUpdatedResponseMW from "../middlewares/db/quiz/sendQuizUpdatedResponseMW";

const router = Router({ mergeParams: true });

// Add authentication middlewares
router.use(authUserMW);

// Add getUserMW
router.use(getUserMW);

// Create new question
router.post(
	"/",
	validateQuizIdMW,
	getQuizMW,
	getUserSubscriptionMW,
	getSubscriptionFeaturesMW,
	validateCreateQuestionAccessMW,
	imageUpload.single("file"),
	parseRequestBodyMW,
	validateQuestionDataMW,
	createQuestionMW,
	uploadQuestionPhotoMW,
	updateQuestionPhotoUrlMW,
	createQuestionPointsMW,
	createAnswerOptionsMW,
	returnQuestionMW
);

// Generate questions from document
router.post(
	"/generate",
	validateQuizIdMW,
	getQuizMW,
	getUserSubscriptionMW,
	getSubscriptionFeaturesMW,
	quizFileUpload.single("file"),
	parseRequestBodyMW,
	validateQuestionsGenerationDataMW,
	uploadQuizDocumentMW,
	getDocumentTextMW,
	createChunksMW,
	selectChunksMW,
	generateQuestionsMW,
	createGeneratedQuestionsMW,
	sendQuizUpdatedResponseMW
);

// Update question
router.put(
	"/:questionId",
	validateQuizIdMW,
	getQuizMW,
	validateQuizWriteActionMW,
	validateQuestionIdMW,
	getQuestionMW,
	validateQuizQuestionMW,
	imageUpload.single("file"),
	parseRequestBodyMW,
	validateQuestionDataMW,
	uploadQuestionPhotoMW,
	updateQuestionMW,
	updateQuestionPhotoUrlMW,
	updateQuestionPointsMW,
	updateAnswerOptionsMW,
	sendQuestionUpdatedResponseMW
);

// Delete question photo
router.delete(
	"/:questionId/photo",
	validateQuizIdMW,
	getQuizMW,
	validateQuizWriteActionMW,
	validateQuestionIdMW,
	getQuestionMW,
	validateQuizQuestionMW,
	deleteQuestionPhotoMW,
	removeQuestionPhotoUrlMW,
	sendQuestionUpdatedResponseMW
);

// Delete question
router.delete(
	"/:questionId",
	validateQuizIdMW,
	getQuizMW,
	validateQuizWriteActionMW,
	validateQuestionIdMW,
	getQuestionMW,
	validateQuizQuestionMW,
	deleteQuestionMW,
	deleteQuestionPhotoMW,
	reorderQuizQuestionsMW,
	sendQuestionDeletedResponseMW
);

export { router as questionRoute };
