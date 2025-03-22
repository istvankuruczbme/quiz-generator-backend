import { Router } from "express";
import validateAuthorizationHeaderMW from "../middlewares/auth/validateAuthorizationHeaderMW";
import getAuthTokenMW from "../middlewares/auth/getAuthTokenMW";
import getUserFromAuthMW from "../middlewares/auth/getUserFromAuthMW";
import { imageUpload } from "../config/multer";
import validateQuizDataMW from "../middlewares/db/quiz/validateQuizDataMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import uploadQuizPhotoMW from "../middlewares/db/quiz/uploadQuizPhotoMW";
import createQuizEmbeddingMW from "../middlewares/db/quiz/createQuizEmbeddingMW";
import createQuizMW from "../middlewares/db/quiz/createQuizMW";
import updateQuizPhotoMW from "../middlewares/db/quiz/updateQuizPhotoMW";
import createQuizConfigMW from "../middlewares/db/quizConfig/createQuizConfigMW";
import returnQuizMW from "../middlewares/db/quiz/returnQuizMW";

const router = Router();

// Create new quiz
router.post(
	"/",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	getUserFromAuthMW,
	getUserMW,
	imageUpload.single("file"),
	validateQuizDataMW,
	createQuizEmbeddingMW,
	createQuizMW,
	uploadQuizPhotoMW,
	updateQuizPhotoMW,
	createQuizConfigMW,
	returnQuizMW
);

export { router as quizRoute };
