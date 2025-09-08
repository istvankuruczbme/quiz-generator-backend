ALTER TABLE "completion_question" DROP COLUMN "id";
ALTER TABLE "completion_question" ADD PRIMARY KEY ("question_id");--> statement-breakpoint