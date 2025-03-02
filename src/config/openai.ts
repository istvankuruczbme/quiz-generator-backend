import OpenAI from "openai";

// Create instance of OpenAI
export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY!,
});
