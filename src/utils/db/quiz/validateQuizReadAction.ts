import { QuizSummary } from "../../../types/quizTypes";
import { User } from "../../../types/userTypes";

export default function validateQuizReadAction(quiz: QuizSummary, user: User): void {
	if (quiz.user.id === user.id) return;

	if (quiz.config.state !== "ACTIVE" || quiz.config.visibility !== "PUBLIC") {
		throw new Error("quiz/not-found");
	}
}
