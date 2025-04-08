import questionResponseFormat from "../../assets/openaiQuestionStructure";
import { openai } from "../../config/openai";
import { OpenAIQuestionResponse } from "../../types/questionTypes";

export default async function generateQuestion(
	text: string,
	answerOptionCount: number
): Promise<OpenAIQuestionResponse> {
	// Create a completion to generate question
	const completion = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{
				role: "developer",
				content: `Generate a multiple-choice question from the given text with ${answerOptionCount} answer options.`,
			},
			{
				role: "user",
				content: text,
			},
		],
		response_format: questionResponseFormat,
	});
	// console.log(completion);

	// Get raw question from response
	const rawQuestion = completion.choices[0]?.message.content;

	// Check if question exists
	if (rawQuestion == undefined) throw new Error("No response from OpenAI API.");

	return JSON.parse(rawQuestion) as OpenAIQuestionResponse;
}
