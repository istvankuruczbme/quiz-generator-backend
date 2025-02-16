import OpenAI from "openai";
import "dotenv/config";

// Create instance of OpenAI
export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});
