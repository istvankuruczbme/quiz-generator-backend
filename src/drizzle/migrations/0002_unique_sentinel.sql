CREATE EXTENSION vector;
CREATE TYPE "public"."quiz_config_question_order" AS ENUM('NORMAL', 'RANDOM');--> statement-breakpoint
CREATE TYPE "public"."quiz_config_visibility" AS ENUM('PUBLIC', 'PRIVATE');--> statement-breakpoint
CREATE TABLE "answer_oprion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text NOT NULL,
	"is_correct" boolean NOT NULL,
	"question_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text NOT NULL,
	"photo_url" text,
	"order" integer NOT NULL,
	"quiz_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question_points" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"correct" real NOT NULL,
	"wrong" real NOT NULL,
	"empty" real NOT NULL,
	"question_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" varchar(255) NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"photo_url" text,
	"embedding" vector(1536) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_completion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"quiz_id" uuid NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_completion_marked_answer_option" (
	"answer_id" uuid NOT NULL,
	"quiz_completion_id" uuid NOT NULL,
	CONSTRAINT "quiz_completion_marked_answer_option_answer_id_quiz_completion_id_pk" PRIMARY KEY("answer_id","quiz_completion_id")
);
--> statement-breakpoint
CREATE TABLE "quiz_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visibility" "quiz_config_visibility" DEFAULT 'PUBLIC' NOT NULL,
	"max_question_count" integer NOT NULL,
	"question_order" "quiz_config_question_order" DEFAULT 'NORMAL' NOT NULL,
	"quiz_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "answer_oprion" ADD CONSTRAINT "answer_oprion_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_points" ADD CONSTRAINT "question_points_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_completion" ADD CONSTRAINT "quiz_completion_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_completion" ADD CONSTRAINT "quiz_completion_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_completion_marked_answer_option" ADD CONSTRAINT "quiz_completion_marked_answer_option_answer_id_answer_oprion_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."answer_oprion"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_completion_marked_answer_option" ADD CONSTRAINT "quiz_completion_marked_answer_option_quiz_completion_id_quiz_completion_id_fk" FOREIGN KEY ("quiz_completion_id") REFERENCES "public"."quiz_completion"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_config" ADD CONSTRAINT "quiz_config_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "embedding_index" ON "quiz" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "customer_id_index" ON "user" USING btree ("customer_id");