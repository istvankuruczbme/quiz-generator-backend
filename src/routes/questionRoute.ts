import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import { imageUpload } from "../config/multer";
import validateQuizIdMW from "../middlewares/db/quiz/validateQuizIdMW";
import validateQuestionData from "../utils/db/question/validateQuestionData";
import createQuestionMW from "../middlewares/db/question/createQuestionMW";
import createQuestionPointsMW from "../middlewares/db/questionPoints/createQuestionPointsMW";
import createAnswerOptionsMW from "../middlewares/db/answerOption/createAnswerOptionsMW";
import uploadQuestionPhotoMW from "../middlewares/db/question/uploadQuestionPhotoMW";
import updateQuestionPhotoUrlMW from "../middlewares/db/question/updateQuestionPhotoUrlMW";
import returnQuestionMW from "../middlewares/db/question/returnQuestionMW";

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
	validateQuestionData,
	createQuestionMW,
	uploadQuestionPhotoMW,
	updateQuestionPhotoUrlMW,
	createQuestionPointsMW,
	createAnswerOptionsMW,
	returnQuestionMW
);

export { router as questionRoute };
