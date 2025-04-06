import { encoder } from "../../config/tiktoken";

export default function freeTokenizer(): void {
	encoder.free();
}
