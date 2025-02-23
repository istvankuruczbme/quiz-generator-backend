declare namespace NodeJS {
	interface ProcessEnv {
		PORT: number;
		CLIENT_URL: string;

		// Supabase
		SUPABASE_URL: string;
		SUPABASE_SERVICE_ROLE: string;
		SUPABASE_DATABASE_URL: string;
		SUPABASE_STORAGE_USER_PHOTOS_BUCKET: string;

		// OpenAI
		OPENAI_API_KEY: string;
		QUESTION_DEVELOPER_PROMPT: string;

		// Stripe
		STRIPE_PUBLIC_KEY: string;
		STRIPE_SECRET_KEY: string;
		STRIPE_WEBHOOK_SECRET: string;
	}
}
