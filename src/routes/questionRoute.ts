import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import validateQuizIdMW from "../middlewares/db/quiz/validateQuizIdMW";
import createQuestionMW from "../middlewares/db/question/createQuestionMW";
import createQuestionPointsMW from "../middlewares/db/questionPoints/createQuestionPointsMW";
import createAnswerOptionsMW from "../middlewares/db/answerOption/createAnswerOptionsMW";
import uploadQuestionPhotoMW from "../middlewares/db/question/uploadQuestionPhotoMW";
import updateQuestionPhotoUrlMW from "../middlewares/db/question/updateQuestionPhotoUrlMW";
import returnQuestionMW from "../middlewares/db/question/returnQuestionMW";
import validateQuestionIdMW from "../middlewares/db/question/validateQuestionIdMW";
import deleteQuestionMW from "../middlewares/db/question/deleteQuestionMW";
import deleteQuestionPhotoMW from "../middlewares/db/question/deleteQuestionPhotoMW";
import sendQuestionDeletedResponseMW from "../middlewares/db/question/sendQuestionDeletedResponseMW";
import reorderQuizQuestionsMW from "../middlewares/db/quiz/reorderQuizQuestionsMW";
import updateQuestionMW from "../middlewares/db/question/updateQuestionMW";
import updateQuestionPointsMW from "../middlewares/db/questionPoints/updateQuestionPointsMW";
import updateAnswerOptionsMW from "../middlewares/db/answerOption/updateAnswerOptionsMW";
import getUserSubscriptionMW from "../middlewares/db/user/getUserSubscriptionMW";
import validateCreateQuestionAccessMW from "../middlewares/db/question/validateCreateQuestionAccessMW";
import getDocumentTextMW from "../middlewares/db/question/generation/getDocumentTextMW";
import createChunksMW from "../middlewares/db/question/generation/createChunksMW";
import validateQuestionsGenerationDataMW from "../middlewares/db/question/generation/validateQuestionsGenerationDataMW";
import selectChunksMW from "../middlewares/db/question/generation/selectChunksMW";
import generateQuestionsMW from "../middlewares/db/question/generation/generateQuestionsMW";
import getSubscriptionFeaturesMW from "../middlewares/stripe/subscription/getSubscriptionFeaturesMW";
import createGeneratedQuestionsMW from "../middlewares/db/question/generation/createGeneratedQuestionsMW";
import uploadQuizDocumentMW from "../middlewares/db/quiz/uploadQuizDocumentMW";
import imageUploadMW from "../middlewares/helper/imageUploadMW";
import quizFileUploadMW from "../middlewares/helper/quizFileUploadMW";
import detectTextLanguageMW from "../middlewares/db/question/generation/detectTextLanguageMW";
import getTokenLimitMW from "../middlewares/db/question/generation/getTokenLimitMW";
import validateExistingGenerationFileMW from "../utils/db/question/generation/validateExistingGenerationFileMW";
import getQuizPrivateMW from "../middlewares/db/quiz/getQuizPrivateMW";
import returnQuizMW from "../middlewares/db/quiz/returnQuizMW";
import validateCreateQuestionDataMW from "../middlewares/db/question/validateCreateQuestionDataMW";
import formatCreatedQuestionMW from "../middlewares/db/question/formatCreatedQuestionMW";
import getQuestionPrivateMW from "../middlewares/db/question/getQuestionPrivateMW";
import validateUpdateQuestionDataMW from "../middlewares/db/question/validateUpdateQuestionDataMW";
import formatUpdatedQuestionMW from "../middlewares/db/question/formatUpdatedQuestionMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, getUserMW, validateQuizIdMW, getQuizPrivateMW);

// Create new question
router.post(
	"/",
	getUserSubscriptionMW,
	getSubscriptionFeaturesMW,
	validateCreateQuestionAccessMW,
	imageUploadMW,
	validateCreateQuestionDataMW,
	createQuestionMW,
	uploadQuestionPhotoMW,
	updateQuestionPhotoUrlMW,
	createQuestionPointsMW,
	createAnswerOptionsMW,
	formatCreatedQuestionMW,
	returnQuestionMW
);

// Generate questions from document
router.post(
	"/generate",
	getUserSubscriptionMW,
	getSubscriptionFeaturesMW,
	validateExistingGenerationFileMW,
	quizFileUploadMW,
	validateQuestionsGenerationDataMW,
	uploadQuizDocumentMW,
	getDocumentTextMW,
	detectTextLanguageMW,
	getTokenLimitMW,
	createChunksMW,
	selectChunksMW,
	generateQuestionsMW,
	createGeneratedQuestionsMW,
	returnQuizMW
);

// Update question
router.put(
	"/:questionId",
	validateQuestionIdMW,
	getQuestionPrivateMW,
	imageUploadMW,
	validateUpdateQuestionDataMW,
	uploadQuestionPhotoMW,
	updateQuestionMW,
	updateQuestionPointsMW,
	updateAnswerOptionsMW,
	formatUpdatedQuestionMW,
	returnQuestionMW
);

// Delete question
router.delete(
	"/:questionId",
	validateQuestionIdMW,
	getQuestionPrivateMW,
	deleteQuestionMW,
	deleteQuestionPhotoMW,
	reorderQuizQuestionsMW,
	sendQuestionDeletedResponseMW
);

export { router as questionRoute };
