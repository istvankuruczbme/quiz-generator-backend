import { encoding_for_model } from "tiktoken";

const encoder = encoding_for_model("chatgpt-4o-latest");

export { encoder };
