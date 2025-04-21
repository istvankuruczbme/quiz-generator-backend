export type Product = {
	id: string;
	name: string;
	description: string | null;
	photoUrl: string | null;
	price: {
		id: string;
		amount: number;
		currency: string;
	};
	maxQuizCountPerPeriod: number;
	maxQuestionCount: number;
	maxAnswerOptionCount: number;
};
