import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { FinishedCompletionWithQuestions } from "../../../types/completionTypes";

export default async function getFinishedCompletion(
	id: string,
	params: { userId: string }
): Promise<FinishedCompletionWithQuestions> {
	// Get params
	const { userId } = params;

	// Get completion
	const completion = await db.query.CompletionTable.findFirst({
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
		},
		where: (completion, { eq, and, isNotNull }) =>
			and(
				eq(completion.id, id),
				eq(completion.userId, userId),
				isNotNull(completion.finishedAt)
			),
	});

	// Check completion
	if (!completion) throw new AppError({ message: "Quiz completion not found.", status: 404 });

	// Return completion
	return completion;
}
