CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firebase_id" char(28) NOT NULL,
	"customer_id" char(18) NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"photo_url" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
