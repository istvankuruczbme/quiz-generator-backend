import { tokenizer } from "../../config/tiktoken";

export default function freeTokenizer(): void {
	tokenizer.free();
}
