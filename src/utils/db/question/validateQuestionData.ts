import validateInteger from "../../validation/validateInteger";
import validateNonEmptyString from "../../validation/validateNonEmptyString";
import validateAnswerOptionsData from "../answerOption/validateAnswerOptionsData";

export default function validateQuestionData(
	text: unknown,
	order: unknown,
	answerOptions: unknown
): void {
	validateNonEmptyString(text, "question/text-");

	validateNonEmptyString("question/order-");
	validateInteger(parseFloat(order as string), "question/order");

	validateNonEmptyString(answerOptions, "question/answer-options-");
	validateAnswerOptionsData(JSON.parse(answerOptions as string));
}
