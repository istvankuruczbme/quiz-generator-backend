import { franc } from "franc";
import { languages } from "../../../assets/languageTokenLimits";
import AppError from "../../../classes/AppError";

export default function getTextLanguage(text: string): string {
	// Get language
	const language = franc(text);

	// Check und response
	if (!languages.includes(language)) {
		throw new AppError({
			message: "Invalid language.",
			details:
				"Please use a document that is written in one of the supported languages (english, hungarian).",
			status: 400,
		});
	}

	// Return language
	return language;
}
