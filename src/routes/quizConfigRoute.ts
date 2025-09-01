import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import validateQuizIdMW from "../middlewares/db/quiz/validateQuizIdMW";
import validateUpdateQuizConfigDataMW from "../middlewares/db/quizConfig/validateUpdateQuizConfigDataMW";
import updateQuizConfigMW from "../middlewares/db/quizConfig/updateQuizConfigMW";
import getQuizPrivateMW from "../middlewares/db/quiz/getQuizPrivateMW";
import returnQuizMW from "../middlewares/db/quiz/returnQuizMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, getUserMW, validateQuizIdMW, getQuizPrivateMW);

// Update config
router.put("/", validateUpdateQuizConfigDataMW, updateQuizConfigMW, returnQuizMW);

export { router as quizConfigRoute };
