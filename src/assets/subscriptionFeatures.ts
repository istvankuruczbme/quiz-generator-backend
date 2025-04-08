const subscriptionFeatures = {
	prod_RnOm2hiNUqppHD: {
		maxQuizCount: 3,
		maxQuestionCount: 10,
		maxAnswerOptionCount: 3,
	},
	prod_RrWrXSBRWc0ZgR: {
		maxQuizCount: 10,
		maxQuestionCount: 30,
		maxAnswerOptionCount: 4,
	},
	prod_RrWsZuNaapPWBZ: {
		maxQuizCount: Infinity,
		maxQuestionCount: 50,
		maxAnswerOptionCount: 6,
	},
} as const;

export type ProductId = keyof typeof subscriptionFeatures;
export type SubscriptionFeatures = (typeof subscriptionFeatures)[ProductId];

export default subscriptionFeatures;
