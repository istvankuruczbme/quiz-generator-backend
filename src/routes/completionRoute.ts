import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import validateQuizIdMW from "../middlewares/db/quiz/validateQuizIdMW";
import createCompletionMW from "../middlewares/db/completion/createCompletionMW";
import validateCompletionIdMW from "../middlewares/db/completion/validateCompletionIdMW";
import getActiveCompletionMW from "../middlewares/db/completion/getActiveCompletionMW";
import getQuizPublicMW from "../middlewares/db/quiz/getQuizPublicMW";
import returnCompletionMW from "../middlewares/db/completion/returnCompletionMW";
import formatCreatedCompletionMW from "../middlewares/db/completion/formatCreatedCompletionMW";
import formatCompletionMW from "../middlewares/db/completion/formatCompletionMW";
import finishCompletionMW from "../middlewares/db/completion/finishCompletionMW";
import getFinishedCompletionMW from "../middlewares/db/completion/getFinishedCompletionMW";
import getCompletionQuizPrivateMW from "../middlewares/db/quiz/getCompletionQuizPrivateMW";
import formatFinishedCompletionMW from "../middlewares/db/completion/formatFinishedCompletionMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, getUserMW, validateQuizIdMW);

// Create completion
router.post(
	"/",
	getQuizPublicMW,
	createCompletionMW,
	formatCreatedCompletionMW,
	returnCompletionMW
);

// Get completion (public)
router.get(
	"/:completionId",
	getQuizPublicMW,
	validateCompletionIdMW,
	getActiveCompletionMW,
	formatCompletionMW,
	returnCompletionMW
);

// Get completion (private)
router.get(
	"/:completionId/private",
	validateCompletionIdMW,
	getFinishedCompletionMW,
	getCompletionQuizPrivateMW,
	formatFinishedCompletionMW,
	returnCompletionMW
);

// Finish completion
router.put(
	"/:completionId/finish",
	getQuizPublicMW,
	validateCompletionIdMW,
	getActiveCompletionMW,
	finishCompletionMW,
	formatCompletionMW,
	returnCompletionMW
);

export { router as completionRoute };
