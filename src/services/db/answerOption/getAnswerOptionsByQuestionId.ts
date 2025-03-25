import { db } from "../../../drizzle/db";
import { AnswerOptionPrivate, AnswerOptionPublic } from "../../../types/answerOptionTypes";

export default async function getAnswerOptionsByQuestionId(
	questionId: string,
	includeIsCorrect = false
): Promise<AnswerOptionPrivate[] | AnswerOptionPublic[]> {
	const answerOptions = await db.query.AnswerOptionTable.findMany({
		columns: {
			id: true,
			text: true,
			isCorrect: includeIsCorrect,
			questionId: false,
		},
		where: (answerOption, { eq }) => eq(answerOption.questionId, questionId),
	});
	return answerOptions;
}
