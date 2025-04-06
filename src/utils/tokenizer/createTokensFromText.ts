import { encoder } from "../../config/tiktoken";

export default function createTokensFromText(text: string): Uint32Array<ArrayBufferLike> {
	return encoder.encode(text);
}
