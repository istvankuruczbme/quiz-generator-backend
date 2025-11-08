-- Enable pg_vector extension
create extension if not exists vector with schema public;

CREATE TYPE "public"."category_name" AS ENUM('history', 'geography', 'science', 'literature', 'art', 'music', 'movies', 'sports', 'technology', 'politics', 'food', 'travel', 'general knowledge');--> statement-breakpoint
CREATE TYPE "public"."quiz_config_question_order" AS ENUM('NORMAL', 'RANDOM');--> statement-breakpoint
CREATE TYPE "public"."quiz_config_state" AS ENUM('DRAFT', 'ACTIVE');--> statement-breakpoint
CREATE TYPE "public"."quiz_config_visibility" AS ENUM('PUBLIC', 'PRIVATE');--> statement-breakpoint

CREATE TABLE "answer_option" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text NOT NULL,
	"is_correct" boolean NOT NULL,
	"question_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "category_name" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "completion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"finished_at" timestamp,
	"quiz_id" uuid NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "completion_question" (
	"question_id" uuid NOT NULL,
	"completion_id" uuid NOT NULL,
	"selected_answer_option_ids" uuid[] NOT NULL,
	"answered_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "completion_question_question_id_completion_id_pk" PRIMARY KEY("question_id","completion_id"),
	CONSTRAINT "selected_answer_option_ids_nonempty" CHECK (array_length("completion_question"."selected_answer_option_ids", 1) > 0)
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
	"question_id" uuid NOT NULL,
	CONSTRAINT "question_points_question_id_unique" UNIQUE("question_id")
);
--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"photo_url" text,
	"embedding" vector(1536) NOT NULL,
	"search" "tsvector" GENERATED ALWAYS AS (setweight(to_tsvector('english', "quiz"."title"), 'A') ||
						  setweight(to_tsvector('english',"quiz"."description"), 'B')) STORED NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"state" "quiz_config_state" DEFAULT 'DRAFT' NOT NULL,
	"visibility" "quiz_config_visibility" DEFAULT 'PUBLIC' NOT NULL,
	"question_order" "quiz_config_question_order" DEFAULT 'NORMAL' NOT NULL,
	"quiz_id" uuid NOT NULL,
	CONSTRAINT "quiz_config_quiz_id_unique" UNIQUE("quiz_id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"photo_url" text,
	"customer_id" char(18),
	"subscription_id" char(28),
	"embedding" vector(1536),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_category" (
	"user_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "user_category_user_id_category_id_pk" PRIMARY KEY("user_id","category_id")
);
--> statement-breakpoint
ALTER TABLE "answer_option" ADD CONSTRAINT "answer_option_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "completion" ADD CONSTRAINT "completion_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "completion" ADD CONSTRAINT "completion_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "completion_question" ADD CONSTRAINT "completion_question_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "completion_question" ADD CONSTRAINT "completion_question_completion_id_completion_id_fk" FOREIGN KEY ("completion_id") REFERENCES "public"."completion"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_points" ADD CONSTRAINT "question_points_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_category_category_id_fk" FOREIGN KEY ("category") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_config" ADD CONSTRAINT "quiz_config_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_category" ADD CONSTRAINT "user_category_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_category" ADD CONSTRAINT "user_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "question_points_question_id_index" ON "question_points" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX "embedding_index" ON "quiz" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX "search_index" ON "quiz" USING gin ("search");--> statement-breakpoint
CREATE UNIQUE INDEX "quiz_config_quiz_id_index" ON "quiz_config" USING btree ("quiz_id");--> statement-breakpoint
CREATE UNIQUE INDEX "customer_id_index" ON "user" USING btree ("customer_id");

-- Create user function
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.user (id, name, photo_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();