import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import { QuizSearchData } from "../../../utils/db/quiz/validation/schemas/quizSearchSchema";
import getQuizzesByEmbedding from "../../../services/db/quiz/getQuizzesByEmbedding";
import { QuizSummary } from "../../../types/quizTypes";
import getQuizzesByCompletionCount from "../../../services/db/quiz/getQuizzesByCompletionCount";
import getQuizSummariesByTitleAndCategory from "../../../services/db/quiz/getQuizSummariesByTitleAndCategory";

export default async function searchQuizzesMW(_: Request, res: Response, next: NextFunction) {
	// Get user and quiz search data
	const { user, quizSearchData } = res.locals as {
		user: UserSelect;
		quizSearchData: QuizSearchData;
	};

	try {
		// Query by search data
		if (
			quizSearchData.searchText ||
			(quizSearchData.categoryIds && quizSearchData.categoryIds.length > 0)
		) {
			// Get quiz summaries by search data
			const quizSummaries = await getQuizSummariesByTitleAndCategory({
				titleQuery: quizSearchData.searchText,
				categoryIds: quizSearchData.categoryIds,
				limit: quizSearchData.limit,
				userId: user.id,
			});

			// Add quizzes to res.locals
			(res.locals.quizSummaries as QuizSummary[]) = quizSummaries;
		}

		// No quiz search data
		if (
			!quizSearchData.searchText &&
			(!quizSearchData.categoryIds || quizSearchData.categoryIds.length === 0)
		) {
			// Recommended quizzes based on categories selected by user
			if (user.embedding) {
				// Get quizzes by user embedding
				const quizSummaries = await getQuizzesByEmbedding(user.embedding, {
					limit: quizSearchData.limit,
					userId: user.id,
				});

				// Add quizzes to res.locals
				(res.locals.quizSummaries as QuizSummary[]) = quizSummaries;
			}
			// Default quizzes
			else {
				// Get quizzes based on completion count
				const quizSummaries = await getQuizzesByCompletionCount({
					limit: quizSearchData.limit,
					userId: user.id,
				});

				// Add quizzes to res.locals
				(res.locals.quizSummaries as QuizSummary[]) = quizSummaries;
			}
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
