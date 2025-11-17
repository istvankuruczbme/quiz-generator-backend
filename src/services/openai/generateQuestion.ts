import questionResponseFormat from "../../assets/openaiQuestionStructure";
import AppError from "../../classes/AppError";
import { openai } from "../../config/openai";
import { OpenAIQuestionResponse } from "../../types/questionTypes";

export default async function generateQuestion(
	text: string,
	answerOptionCount: number,
	temperature?: number
): Promise<OpenAIQuestionResponse> {
	// Create a completion to generate question
	const completion = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{
				role: "developer",
				content: `Your task is to generate a multiple-choice question with ${answerOptionCount} possible answer options from the given text. There must be at least 1 correct answer. The question and answer options must always be written in the language of the text.`,
			},
			{
				role: "user",
				content: text,
			},
		],
		response_format: questionResponseFormat,
		temperature: temperature ?? 0.5,
	});
	// console.log(completion);

	// Get raw question from response
	const rawQuestion = completion.choices[0]?.message.content;

	// Check if question exists
	if (!rawQuestion) throw new AppError({ message: "No question generated" });

	// Return parsed question
	return JSON.parse(rawQuestion) as OpenAIQuestionResponse;
}
