import { encoding_for_model } from "tiktoken";

// Tokenizer for tokenizing text for the specified model
export const tokenizer = encoding_for_model("chatgpt-4o-latest");
