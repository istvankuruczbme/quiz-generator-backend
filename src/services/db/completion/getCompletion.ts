import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { CompletionWithQuestions } from "../../../types/completionTypes";

export default async function getCompletion(
	id: string,
	params: { quizId: string }
): Promise<CompletionWithQuestions> {
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
		where: (completion, { eq, and }) => and(eq(completion.id, id), eq(completion.quizId, quizId)),
	});

	// Check completion
	if (!completion) throw new AppError({ message: "Quiz completion not found.", status: 404 });

	// Return completion
	return completion;
}
