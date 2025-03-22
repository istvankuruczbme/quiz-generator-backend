CREATE TYPE "public"."quiz_config_status" AS ENUM('DRAFT', 'ACTIVE', 'DELETED');--> statement-breakpoint
ALTER TABLE "quiz_config" ADD COLUMN "status" "quiz_config_status" DEFAULT 'DRAFT' NOT NULL;