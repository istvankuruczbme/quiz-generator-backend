import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { ActiveCompletionWithQuestions } from "../../../types/completionTypes";

export default async function getActiveCompletion(
	id: string,
	params: { quizId: string }
): Promise<ActiveCompletionWithQuestions> {
	// Get quiz ID
	const { quizId } = params;

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
		},
		where: (completion, { eq, and, isNull }) =>
			and(eq(completion.id, id), eq(completion.quizId, quizId), isNull(completion.finishedAt)),
	});

	// Check completion
	if (!completion) throw new AppError({ message: "Quiz completion not found.", status: 404 });

	// Return completion
	return completion;
}
