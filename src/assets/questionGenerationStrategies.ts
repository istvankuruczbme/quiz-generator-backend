const questionGenerationStrategies = ["RANDOM", "TFIDF"] as const;

export type QuestionGenerationStrategy = (typeof questionGenerationStrategies)[number];

export default questionGenerationStrategies;
