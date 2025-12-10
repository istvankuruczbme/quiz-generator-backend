import createTokensFromText from "../../../tokenizer/createTokensFromText";

const MAX_TOKENS = 168_000 - 16_000; // 168k context window - max output

type Group = {
	text: string;
	tokenCount: number;
};

function createSubGroups(group: Group, maxChars: number): Group[] {
	const subGroups: Group[] = [];
	let charCount = 0;

	while (charCount < group.text.length) {
		const subChunk = group.text.slice(charCount, charCount + maxChars);
		const subChunkTokenCount = createTokensFromText(subChunk).length;

		subGroups.push({ text: subChunk, tokenCount: subChunkTokenCount });
		charCount += maxChars;
	}

	return subGroups;
}

export default function groupChunksByTokenCount(
	chunks: string[],
	minChunkTokenCount: number
): string[] {
	const groups: Group[] = [];

	for (const chunk of chunks) {
		const tokenCount = createTokensFromText(chunk).length;

		// Token count exceeds max tokens
		if (tokenCount > MAX_TOKENS) {
			const maxChars = Math.floor((MAX_TOKENS / tokenCount) * chunk.length * 0.9); // 0.9 safety factor

			const subGroups = createSubGroups({ text: chunk, tokenCount }, maxChars);
			groups.push(...subGroups);

			continue;
		}

		// Normal chunk, add to groups
		if (groups.length === 0) {
			groups.push({ text: chunk, tokenCount });
		} else {
			if (tokenCount < minChunkTokenCount || groups.at(-1)!.tokenCount < minChunkTokenCount) {
				const newGroupTokenCount = groups.at(-1)!.tokenCount + tokenCount;
				if (newGroupTokenCount <= MAX_TOKENS) {
					groups.at(-1)!.text += "\n\n" + chunk;
					groups.at(-1)!.tokenCount = newGroupTokenCount;
				} else {
					groups.push({ text: chunk, tokenCount });
				}
			} else {
				groups.push({ text: chunk, tokenCount });
			}
		}
	}

	// Return text of groups
	return groups.map((group) => group.text);
}
