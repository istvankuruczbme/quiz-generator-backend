const subscriptionFeatures = {
	prod_RnOm2hiNUqppHD: {
		maxQuizCount: 3,
		maxQuestionCountPerQuiz: 10,
	},
	prod_RrWrXSBRWc0ZgR: {
		maxQuizCount: 10,
		maxQuestionCountPerQuiz: 30,
	},
	prod_RrWsZuNaapPWBZ: {
		maxQuizCount: Infinity,
		maxQuestionCountPerQuiz: 50,
	},
} as const;

export type ProductId = keyof typeof subscriptionFeatures;

export default subscriptionFeatures;
