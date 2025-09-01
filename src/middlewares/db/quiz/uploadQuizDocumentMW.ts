import { Request, Response, NextFunction } from "express";
import { QuizPrivate } from "../../../types/quizTypes";
import uploadQuizFile from "../../../services/db/quiz/uploadQuizFile";

export default async function uploadQuizDocumentMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: QuizPrivate };
	// Get file from req.body
	const { file } = req as { file: Express.Multer.File };

	try {
		// Upload file
		await uploadQuizFile(file, quiz.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
