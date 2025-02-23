import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { AnswerOptionTable } from "./answerOption";
import { QuizCompletionTable } from "./quizCompletion";
import { relations } from "drizzle-orm";

// Schema
export const QuizCompletionMarkedAnswerOptionTable = pgTable(
	"quiz_completion_marked_answer_option",
	{
		answerOptionId: uuid("answer_option_id")
			.references(() => AnswerOptionTable.id)
			.notNull(),
		quizCompletionId: uuid("quiz_completion_id")
			.references(() => QuizCompletionTable.id)
			.notNull(),
	},
	(table) => [primaryKey({ columns: [table.answerOptionId, table.quizCompletionId] })]
);

// Relations
export const QuizCompletionMarkedAnswerOptionRelations = relations(
	QuizCompletionMarkedAnswerOptionTable,
	({ one }) => {
		return {
			answerOption: one(AnswerOptionTable, {
				fields: [QuizCompletionMarkedAnswerOptionTable.answerOptionId],
				references: [AnswerOptionTable.id],
			}),
			quizCompletion: one(QuizCompletionTable, {
				fields: [QuizCompletionMarkedAnswerOptionTable.quizCompletionId],
				references: [QuizCompletionTable.id],
			}),
		};
	}
);
