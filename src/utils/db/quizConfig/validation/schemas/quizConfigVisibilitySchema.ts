import z from "zod/v4";
import { quizConfigVisibilityOptions } from "../../../../../drizzle/schema/quizConfig";

export const quizConfigVisibilitySchema = z.union(
	quizConfigVisibilityOptions.map((option) => z.literal(option))
);
