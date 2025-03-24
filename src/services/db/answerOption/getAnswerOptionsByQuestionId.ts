import { db } from "../../../drizzle/db";
import { AnswerOptionPublic } from "../../../types/answerOptionTypes";

export default async function getAnswerOptionsByQuestionId(
	questionId: string
): Promise<AnswerOptionPublic[]> {
	const answerOptions = await db.query.AnswerOptionTable.findMany({
		columns: {
			isCorrect: false,
		},
		where: (answerOption, { eq }) => eq(answerOption.questionId, questionId),
	});
	return answerOptions;
}
