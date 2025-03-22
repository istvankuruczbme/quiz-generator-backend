import validateNonEmptyString from "../../../utils/validation/validateNonEmptyString";
import validateUUID from "../../../utils/validation/validateUUID";

export default function validateQuizData(
	title: unknown,
	description: unknown,
	categoryId: unknown
): void {
	validateNonEmptyString(title, "quiz/title-");
	validateNonEmptyString(description, "quiz/description-");
	validateUUID(categoryId);
}
