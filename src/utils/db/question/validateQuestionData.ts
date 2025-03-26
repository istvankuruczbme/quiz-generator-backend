import validateInteger from "../../validation/validateInteger";
import validateNonEmptyString from "../../validation/validateNonEmptyString";
import validateAnswerOptionsData from "../answerOption/validateAnswerOptionsData";

export default function validateQuestionData(
	text: unknown,
	order: unknown,
	answerOptions: unknown
): void {
	validateNonEmptyString(text);
	validateInteger(order);
	validateAnswerOptionsData(answerOptions);
}
