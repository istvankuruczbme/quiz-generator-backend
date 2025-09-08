import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import validateQuizIdMW from "../middlewares/db/quiz/validateQuizIdMW";
import getQuizPublicMW from "../middlewares/db/quiz/getQuizPublicMW";
import validateCompletionIdMW from "../middlewares/db/completion/validateCompletionIdMW";
import getCompletionMW from "../middlewares/db/completion/getCompletionMW";
import validateCreateCompletionQuestionMW from "../middlewares/db/completionQuestion/validateCreateCompletionQuestionMW";
import createCompletionQuestionMW from "../middlewares/db/completionQuestion/createCompletionQuestionMW";
import validateQuestionIdMW from "../middlewares/db/question/validateQuestionIdMW";
import getQuestionPrivateMW from "../middlewares/db/question/getQuestionPrivateMW";
import formatCreatedCompletionMW from "../middlewares/db/completion/formatCreatedCompletionMW";
import returnCompletionQuestionMW from "../middlewares/db/completionQuestion/returnCompletionQuestionMW";
import getCompletionQuestionPrivateMW from "../middlewares/db/completionQuestion/getCompletionQuestionPrivateMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(
	authUserMW,
	getUserMW,
	validateQuizIdMW,
	getQuizPublicMW,
	validateCompletionIdMW,
	getCompletionMW
);

// Create completion question
router.post(
	"/",
	validateCreateCompletionQuestionMW,
	createCompletionQuestionMW,
	formatCreatedCompletionMW,
	returnCompletionQuestionMW
);

// Get completion question with private data
router.get(
	"/:questionId",
	validateQuestionIdMW,
	getQuestionPrivateMW,
	getCompletionQuestionPrivateMW,
	returnCompletionQuestionMW
);

export { router as completionQuestionRoute };
