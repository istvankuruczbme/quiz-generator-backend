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
import deleteQuestionPointsMW from "../middlewares/db/questionPoints/deleteQuestionPointsMW";
import deleteQuestionMW from "../middlewares/db/question/deleteQuestionMW";
import deleteQuestionPhotoMW from "../middlewares/db/question/deleteQuestionPhotoMW";
import sendQuestionDeletedResponseMW from "../middlewares/db/question/sendQuestionDeletedResponseMW";

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

// Delete a question
router.delete(
	"/:questionId",
	validateQuestionIdMW,
	getQuestionMW,
	// check if deleting the question is possbile
	deleteQuestionMW,
	deleteQuestionPhotoMW,
	// reorder questions
	sendQuestionDeletedResponseMW
);

export { router as questionRoute };
