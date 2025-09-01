import z from "zod/v4";
import questionGenerationStrategies from "../../../../../../assets/questionGenerationStrategies";

export const questionGenerationStrategySchema = z.union(
	questionGenerationStrategies.map((option) => z.literal(option))
);
