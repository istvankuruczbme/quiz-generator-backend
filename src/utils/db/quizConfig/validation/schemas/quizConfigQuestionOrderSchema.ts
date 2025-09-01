import z from "zod/v4";
import { quizConfigQuestionOrderOptions } from "../../../../../drizzle/schema/quizConfig";

export const quizConfigQuestionOrderSchema = z.union(
	quizConfigQuestionOrderOptions.map((option) => z.literal(option))
);
