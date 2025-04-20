import { franc } from "franc";
import { languages } from "../../../assets/languageTokenLimits";

export default function getTextLanguage(text: string): string {
	// Get language
	const language = franc(text);

	// Check und response
	if (!languages.includes(language)) throw new Error("quiz/questions/generation-language-invalid");

	// Return language
	return language;
}
