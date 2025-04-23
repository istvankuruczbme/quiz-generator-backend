const questionGenerationStrategies = ["RANDOM", "TFIDF", "EMBEDDING"] as const;

export type QuestionGenerationStrategy = (typeof questionGenerationStrategies)[number];

export default questionGenerationStrategies;
