import validateInteger from "../../validation/validateInteger";
import validateNonEmptyString from "../../validation/validateNonEmptyString";
import validateAnswerOptionsData from "../answerOption/validateAnswerOptionsData";

export default function validateQuestionData(
	text: unknown,
	order: unknown,
	answerOptions: unknown
): void {
	validateNonEmptyString(text, "question/text-");
	validateInteger(order, "question/order");
	if ((order as number) < 1) throw new Error("question/order-invalid");
	validateAnswerOptionsData(answerOptions);
}
