import { Chunk } from "../../../../types/questionTypes";

export default function formatChunks(chunks: Chunk[]): string[] {
	const formattedChunks = chunks.map((chunk) => {
		const formattedLines = chunk.map((line) => {
			if (line.type.startsWith("list")) return `\n${line.content.trim()}`;
			return line.content.trim();
		});
		return formattedLines.join(" ");
	});
	return formattedChunks;
}
