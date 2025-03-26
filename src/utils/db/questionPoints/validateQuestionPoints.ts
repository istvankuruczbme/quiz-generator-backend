import validateNumber from "../../validation/validateNumber";

export default function validateQuestionPoints(
	correct: unknown,
	wrong: unknown,
	empty: unknown
): void {
	validateNumber(correct);
	validateNumber(wrong);
	validateNumber(empty);
}
