import { QuizFullPrivate } from "../../../types/quizTypes";
import { UserSelect } from "../../../types/userTypes";

export default function validateQuizWriteAction(quiz: QuizFullPrivate, user: UserSelect): void {
	// Check if quiz was made by the user
	if (quiz.user.id !== user.id) throw new Error("quiz/not-found");

	// Check if quiz is in DRAFT state
	if (quiz.config.state !== "DRAFT") throw new Error("quiz/not-modifiable");
}
