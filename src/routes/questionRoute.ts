import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import { imageUpload } from "../config/multer";
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

const router = Router({ mergeParams: true });

// Add authentication middlewares
router.use(authUserMW);

// Add getUserMW
router.use(getUserMW);

// Create new question
router.post(
	"/",
	validateQuizIdMW,
	imageUpload.single("file"),
	validateQuestionDataMW,
	createQuestionMW,
	uploadQuestionPhotoMW,
	updateQuestionPhotoUrlMW,
	createQuestionPointsMW,
	createAnswerOptionsMW,
	returnQuestionMW
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
	validateQuestionDataMW,
	uploadQuestionPhotoMW,
	updateQuestionMW,
	updateQuestionPhotoUrlMW,
	updateQuestionPointsMW,
	updateAnswerOptionsMW,
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
