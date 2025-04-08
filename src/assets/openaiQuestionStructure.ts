import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

// Answer structure
const Answer = z.object({
	text: z.string(),
	isCorrect: z.boolean(),
});
// Question format
const Question = z.object({
	text: z.string(),
	answerOptions: z.array(Answer),
});

// Response format
const questionResponseFormat = zodResponseFormat(Question, "question");
export default questionResponseFormat;
