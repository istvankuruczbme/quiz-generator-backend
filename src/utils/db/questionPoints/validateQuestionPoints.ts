import validateNonEmptyString from "../../validation/validateNonEmptyString";
import validateNumber from "../../validation/validateNumber";

export default function validateQuestionPoints(points: unknown): void {
	validateNonEmptyString(points, "question/points-");
	const { correct, wrong, empty } = JSON.parse(points as string) as {
		correct: unknown;
		wrong: unknown;
		empty: unknown;
	};

	// validateNonEmptyString(correct, "question/points/correct-");
	validateNumber(parseFloat(correct as string), "question/points/correct");

	// validateNonEmptyString(wrong, "question/points/wrong-");
	validateNumber(parseFloat(wrong as string), "question/points/wrong");

	// validateNonEmptyString(empty, "question/points/empty-");
	validateNumber(parseFloat(empty as string), "question/points/empty");
}
