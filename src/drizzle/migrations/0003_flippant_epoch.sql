ALTER TABLE "answer_oprion" RENAME TO "answer_option";--> statement-breakpoint
ALTER TABLE "answer_option" DROP CONSTRAINT "answer_oprion_question_id_question_id_fk";
--> statement-breakpoint
ALTER TABLE "quiz_completion_marked_answer_option" DROP CONSTRAINT "quiz_completion_marked_answer_option_answer_id_answer_oprion_id_fk";
--> statement-breakpoint
DROP INDEX "firebase_id_index";--> statement-breakpoint
ALTER TABLE "answer_option" ADD CONSTRAINT "answer_option_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_completion_marked_answer_option" ADD CONSTRAINT "quiz_completion_marked_answer_option_answer_id_answer_option_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."answer_option"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "firebase_id";