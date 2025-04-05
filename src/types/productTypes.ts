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
	maxQuizCount: number;
	maxQuestionCountPerQuiz: number;
};
