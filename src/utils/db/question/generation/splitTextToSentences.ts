import { split } from "sentence-splitter";

export default function splitTextToSentences(text: string): string[] {
	return split(text)
		.filter((node) => node.type === "Sentence")
		.map((node) => node.raw);
}
