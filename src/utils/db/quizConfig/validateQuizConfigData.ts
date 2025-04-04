import {
	QuizConfigQuestionOrder,
	quizConfigQuestionOrderOptions,
	QuizConfigVisibility,
	quizConfigVisibilityOptions,
} from "../../../drizzle/schema/quizConfig";

export default function validateQuizConfigData(visibility: unknown, questionOrder: unknown): void {
	if (visibility == undefined) throw new Error("quiz/config/visibility-missing");
	if (!quizConfigVisibilityOptions.includes(visibility as QuizConfigVisibility)) {
		throw new Error("quiz/config/invalid-visibility");
	}

	if (questionOrder == undefined) throw new Error("quiz/config/question-order-missing");
	if (!quizConfigQuestionOrderOptions.includes(questionOrder as QuizConfigQuestionOrder)) {
		throw new Error("quiz/config/invalid-question-order");
	}
}
