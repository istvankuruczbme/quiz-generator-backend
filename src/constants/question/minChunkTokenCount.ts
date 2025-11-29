import { Language } from "./languages";

export const MIN_CHUNK_TOKEN_COUNT: Record<Language, number> = {
	eng: 100,
	hun: 200,
} as const;
