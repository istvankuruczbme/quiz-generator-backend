import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import validateQuizIdMW from "../middlewares/db/quiz/validateQuizIdMW";
import createCompletionMW from "../middlewares/db/completion/createCompletionMW";
import validateCompletionIdMW from "../middlewares/db/completion/validateCompletionIdMW";
import getCompletionMW from "../middlewares/db/completion/getCompletionMW";
import getQuizPublicMW from "../middlewares/db/quiz/getQuizPublicMW";
import returnCompletionMW from "../middlewares/db/completion/returnCompletionMW";
import formatCreatedCompletionMW from "../middlewares/db/completion/formatCreatedCompletionMW";
import formatCompletionMW from "../middlewares/db/completion/formatCompletionMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, getUserMW, validateQuizIdMW, getQuizPublicMW);

// Create completion
router.post("/", createCompletionMW, formatCreatedCompletionMW, returnCompletionMW);

// Get completion (public)
router.get(
	"/:completionId",
	validateCompletionIdMW,
	getCompletionMW,
	formatCompletionMW,
	returnCompletionMW
);

export { router as completionRoute };
