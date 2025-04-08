const questionGenerationStrategies = ["RANDOM"] as const;

export type QuestionGenerationStrategy = (typeof questionGenerationStrategies)[number];

export default questionGenerationStrategies;
