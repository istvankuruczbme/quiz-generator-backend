CREATE TABLE "completion_question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"selected_answer_option_ids" uuid[] NOT NULL,
	"answered_at" timestamp DEFAULT now() NOT NULL,
	"question_id" uuid NOT NULL,
	"completion_id" uuid NOT NULL,
	CONSTRAINT "selected_answer_option_ids_nonempty" CHECK (array_length("completion_question"."selected_answer_option_ids", 1) > 0)
);
--> statement-breakpoint
ALTER TABLE "quiz_completion_marked_answer_option" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "quiz_completion_marked_answer_option" CASCADE;--> statement-breakpoint
ALTER TABLE "quiz_completion" RENAME TO "completion";--> statement-breakpoint
ALTER TABLE "completion" DROP CONSTRAINT "quiz_completion_quiz_id_quiz_id_fk";
--> statement-breakpoint
ALTER TABLE "completion" DROP CONSTRAINT "quiz_completion_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "completion" ADD COLUMN "finished_at" timestamp;--> statement-breakpoint
ALTER TABLE "completion_question" ADD CONSTRAINT "completion_question_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "completion_question" ADD CONSTRAINT "completion_question_completion_id_completion_id_fk" FOREIGN KEY ("completion_id") REFERENCES "public"."completion"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "completion" ADD CONSTRAINT "completion_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "completion" ADD CONSTRAINT "completion_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;