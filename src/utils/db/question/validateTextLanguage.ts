import { franc } from "franc";
import AppError from "../../../classes/AppError";

const LANGUAGES = ["eng", "hun"];

export default function validateTextLanguage(text: string): void {
	// Get language
	const language = franc(text);

	// Check und response
	if (!LANGUAGES.includes(language)) {
		throw new AppError({
			message: "Invalid language.",
			details:
				"Please use a document that is written in one of the supported languages (english, hungarian).",
			status: 400,
		});
	}
}
