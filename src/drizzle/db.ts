import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as user from "./schema/user";
import * as quiz from "./schema/quiz";
import * as quizConfig from "./schema/quizConfig";
import * as question from "./schema/question";
import * as questionPoints from "./schema/questionPoints";
import * as answerOption from "./schema/answerOption";
import * as quizCompletion from "./schema/quizCompletion";
import * as quizCompletionMarkedAnswerOption from "./schema/quizCompletionMarkedAnswerOption";

const client = postgres(process.env.SUPABASE_DATABASE_URL!, { prepare: false });

// Schema
const schema = {
	...user,
	...quiz,
	...quizConfig,
	...question,
	...questionPoints,
	...answerOption,
	...quizCompletion,
	...quizCompletionMarkedAnswerOption,
};

export const db = drizzle(client, { schema });
