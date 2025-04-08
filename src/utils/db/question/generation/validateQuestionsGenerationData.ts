import questionGenerationStrategies, {
	QuestionGenerationStrategy,
} from "../../../../assets/questionGenerationStrategies";
import validateInteger from "../../../validation/validateInteger";

export default function validateQuestionsGenerationData(
	strategy: unknown,
	questionCount: unknown,
	answerOptionCount: unknown
): void {
	if (strategy == undefined) throw new Error("quiz/questions/generation-strategy-missing");
	if (!questionGenerationStrategies.includes(strategy as QuestionGenerationStrategy)) {
		throw new Error("quiz/questions/invalid-generation-strategy");
	}

	validateInteger(questionCount);
	if ((questionCount as number) < 1) {
		throw new Error("quiz/questions/generation-question-count-invalid");
	}

	validateInteger(answerOptionCount);
	if ((answerOptionCount as number) < 1) {
		throw new Error("quiz/questions/generation-answer-option-count-invalid");
	}
}
