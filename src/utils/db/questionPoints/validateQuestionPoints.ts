import validateNumber from "../../validation/validateNumber";

export default function validateQuestionPoints(
	correct: unknown,
	wrong: unknown,
	empty: unknown
): void {
	validateNumber(correct, "question/points/correct");
	validateNumber(wrong, "question/points/wrong");
	validateNumber(empty, "question/points/empty");
}
