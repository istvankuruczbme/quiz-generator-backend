import { AnswerOptionPrivate } from "../../../types/answerOptionTypes";
import validateBoolean from "../../validation/validateBoolean";
import validateNonEmptyString from "../../validation/validateNonEmptyString";
import validateUUID from "../../validation/validateUUID";

export default function validateAnswerOptionsData(answerOptions: unknown): void {
	// Check answer options variable
	if (!Array.isArray(answerOptions) || answerOptions.length === 0) {
		throw new Error("question/answer-options-missing");
	}

	// Check elements of answer options
	for (const option of answerOptions as unknown[]) {
		if (typeof option !== "object" || option == null) {
			throw new Error("question/answer-option-invalid");
		}

		if (!("id" in option)) throw new Error("question/answer-option-invalid");
		validateUUID(option.id, "question/answer-option-");

		if (!("text" in option)) throw new Error("question/answer-option-invalid");
		validateNonEmptyString(option.text, "question/answer-option-");

		if (!("isCorrect" in option)) throw new Error("question/answer-option-invalid");
		validateBoolean(option.isCorrect, "question/answer-option-");
	}

	// Check number of correct answers
	const correctAnswers = (answerOptions as AnswerOptionPrivate[]).filter(
		(option) => option.isCorrect
	);
	if (correctAnswers.length === 0) throw new Error("question/correct-answer-option-missing");
}
