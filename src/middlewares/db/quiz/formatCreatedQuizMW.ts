import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import { QuizPrivate, QuizSelect } from "../../../types/quizTypes";
import { QuizConfigSelect } from "../../../types/quizConfigTypes";
import { CreateQuizData } from "../../../utils/db/quiz/validation/schemas/createQuizSchema";
import getCategory from "../../../services/db/category/getCategory";
import getUserPublicData from "../../../utils/db/user/getUserPublicData";

export default async function formatCreatedQuizMW(_: Request, res: Response, next: NextFunction) {
	// Get user, quiz, quiz config, quiz data
	const { user, quiz, quizConfig, quizData } = res.locals as {
		user: UserSelect;
		quiz: QuizSelect;
		quizConfig: QuizConfigSelect;
		quizData: CreateQuizData;
	};

	try {
		// Get category
		const category = await getCategory(quizData.categoryId);

		// Update quiz in res.locals
		(res.locals.quiz as QuizPrivate) = {
			id: quiz.id,
			title: quiz.title,
			description: quiz.description,
			photoUrl: quiz.photoUrl,
			updatedAt: quiz.updatedAt,
			createdAt: quiz.createdAt,
			config: {
				state: quizConfig.state,
				visibility: quizConfig.visibility,
				questionOrder: quizConfig.questionOrder,
			},
			category,
			user: getUserPublicData(user),
			questions: [],
			completionCount: 0,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
