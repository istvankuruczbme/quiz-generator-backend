import { tokenizer } from "../../config/tiktoken";

export default function createTokensFromText(text: string): Uint32Array<ArrayBufferLike> {
	return tokenizer.encode(text);
}
