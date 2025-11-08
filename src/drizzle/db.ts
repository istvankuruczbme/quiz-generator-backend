import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as user from "./schema/user";
import * as category from "./schema/category";
import * as userCategory from "./schema/userCategory";
import * as quiz from "./schema/quiz";
import * as quizConfig from "./schema/quizConfig";
import * as question from "./schema/question";
import * as questionPoints from "./schema/questionPoints";
import * as answerOption from "./schema/answerOption";
import * as completion from "./schema/completion";
import * as completionQuestion from "./schema/completionQuestion";

// Postgres client
const postgresClient = postgres(process.env.SUPABASE_DATABASE_URL!, { prepare: false });

// Schema
const schema = {
	...user,
	...category,
	...userCategory,
	...quiz,
	...quizConfig,
	...question,
	...questionPoints,
	...answerOption,
	...completion,
	...completionQuestion,
};

// Drizzle client
export const db = drizzle(postgresClient, { schema });
