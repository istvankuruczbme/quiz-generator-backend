import { AnswerOptionInput } from "../../../types/answerOptionTypes";
import validateBoolean from "../../validation/validateBoolean";
import validateNonEmptyString from "../../validation/validateNonEmptyString";

export default function validateAnswerOptionsData(answerOptions: unknown): void {
	// Check answer options variable
	if (!Array.isArray(answerOptions) || answerOptions.length === 0) {
		throw new Error("question/answer-options-missing");
	}

	// Check elements of answer options
	for (const option of answerOptions as unknown[]) {
		if (typeof option !== "object" || option == null) {
			throw new Error("question/invalid-answer-option");
		}

		if (!("text" in option)) throw new Error("question/answer-option/text-missing");
		validateNonEmptyString(option.text, "question/answer-option/text-");

		if (!("isCorrect" in option)) throw new Error("question/answer-option/isCorrect-missing");
		validateBoolean(option.isCorrect, "question/answer-option/isCorrect-");
	}

	// Check number of correct answers
	const correctAnswers = (answerOptions as AnswerOptionInput[]).filter(
		(option) => option.isCorrect
	);
	if (correctAnswers.length === 0) throw new Error("question/correct-answer-option-missing");
}
