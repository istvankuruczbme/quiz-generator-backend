ALTER TABLE "public"."category" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."category_name";--> statement-breakpoint
CREATE TYPE "public"."category_name" AS ENUM('history', 'geography', 'science', 'literature', 'art', 'music', 'movies', 'sports', 'technology', 'politics', 'food', 'travel', 'general knowledge');--> statement-breakpoint
ALTER TABLE "public"."category" ALTER COLUMN "name" SET DATA TYPE "public"."category_name" USING "name"::"public"."category_name";