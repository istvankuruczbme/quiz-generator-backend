import validateUUID from "../../validation/validateUUID";

export default function validateQuestionsOrderData(questionIds: unknown): void {
	if (!Array.isArray(questionIds)) throw new Error("quiz/questions/invalid-data");

	for (const questionId of questionIds as unknown[]) {
		if (questionId == undefined) throw new Error("quiz/questions/question-missing");
		validateUUID(questionId, "quiz/questions/question-");
	}
}
