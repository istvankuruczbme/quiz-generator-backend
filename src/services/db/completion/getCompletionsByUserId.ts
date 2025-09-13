import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { CompletionQuestionPublic } from "../../../types/completionQuestionTypes";
import { CompletionPublic } from "../../../types/completionTypes";
import getQuizzesPublicByQuizIds from "../quiz/getQuizzesPublicByQuizIds";

export default async function getCompletionsByUserId(userId: string): Promise<CompletionPublic[]> {
	// Get completions
	const completionsRaw = await db.query.CompletionTable.findMany({
		columns: {
			quizId: false,
			userId: false,
		},
		with: {
			questions: {
				columns: {
					completionId: false,
				},
			},
			quiz: {
				columns: {
					id: true,
				},
			},
			user: {
				columns: {
					id: true,
					name: true,
					photoUrl: true,
				},
			},
		},
		where: (completion, { eq }) => eq(completion.userId, userId),
	});

	// Get quizzes
	const quizIds = Array.from(new Set(completionsRaw.map((completion) => completion.quiz.id)));
	const quizzes = await getQuizzesPublicByQuizIds(quizIds);

	// Map quizzes to completions
	const completions: CompletionPublic[] = completionsRaw.map((completion) => {
		// Get completion quiz
		const quiz = quizzes.find((q) => q.id === completion.quiz.id);

		// Check quiz
		if (!quiz) throw new AppError({ message: "Quiz not found.", status: 404 });

		// Map completion question to quiz question
		const questions: CompletionQuestionPublic[] = quiz.questions.map((question) => {
			// Get completion question
			const completionQuestion = completion.questions.find(
				(completionQuestion) => completionQuestion.questionId === question.id
			);

			// Check completion question
			if (!completionQuestion) return question;

			// Return question with completion
			return {
				...question,
				completion: {
					selectedAnswerOptionIds: completionQuestion.selectedAnswerOptionIds,
					answeredAt: completionQuestion.answeredAt,
				},
			};
		});

		// Return completion
		return {
			id: completion.id,
			updatedAt: completion.updatedAt,
			createdAt: completion.createdAt,
			finishedAt: completion.finishedAt,
			user: completion.user,
			quiz: {
				...quiz,
				questions,
			},
		};
	});

	// Return completions
	return completions;
}
