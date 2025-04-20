import questionGenerationStrategies, {
	QuestionGenerationStrategy,
} from "../../../../assets/questionGenerationStrategies";
import validateInteger from "../../../validation/validateInteger";
import validateNumber from "../../../validation/validateNumber";

export default function validateQuestionsGenerationData(
	strategy: unknown,
	creativity: unknown,
	questionCount: unknown,
	answerOptionCount: unknown
): void {
	if (strategy == undefined) throw new Error("quiz/questions/generation-strategy-missing");
	if (!questionGenerationStrategies.includes(strategy as QuestionGenerationStrategy)) {
		throw new Error("quiz/questions/generation-strategy-invalid");
	}

	validateNumber(creativity, "quiz/questions/generation-creativity");
	if ((creativity as number) < 0 || (creativity as number) > 100) {
		throw new Error("quiz/questions/generation-creativity-invalid");
	}

	validateInteger(questionCount, "quiz/questions/question-count");
	if ((questionCount as number) < 1) {
		throw new Error("quiz/questions/generation-question-count-invalid");
	}

	validateInteger(answerOptionCount, "quiz/questions/answer-option-count");
	if ((answerOptionCount as number) < 1) {
		throw new Error("quiz/questions/generation-answer-option-count-invalid");
	}
}
