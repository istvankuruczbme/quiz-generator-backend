import { db } from "../../../drizzle/db";
import { Quiz } from "../../../types/quizTypes";

export default async function getQuizByQuestionId(questionId: string): Promise<Quiz> {
	// Get question
	const question = await db.query.QuestionTable.findFirst({
		columns: {
			id: false,
			photoUrl: false,
			text: false,
			order: false,
			quizId: false,
		},
		with: {
			quiz: true,
		},
		where: (question, { eq }) => eq(question.id, questionId),
	});

	// Check if question exists
	if (question == undefined) throw new Error("question/not-found");

	// Return quiz
	return question.quiz;
}
