import { franc } from "franc";
import AppError from "../../../classes/AppError";
import { Language, LANGUAGES } from "../../../constants/question/languages";

export default function validateTextLanguage(text: string): Language {
	// Get language
	const language = franc(text);

	// Check if language is supported
	if (!LANGUAGES.includes(language as Language)) {
		throw new AppError({
			message: "Invalid language.",
			details:
				"Please use a document that is written in one of the supported languages (english, hungarian).",
			status: 400,
		});
	}

	// Return detected language
	return language as Language;
}
