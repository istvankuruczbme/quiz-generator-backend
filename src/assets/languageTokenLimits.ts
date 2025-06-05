const languageTokenLimits = {
	hun: 500,
	eng: 250,
} as const;

export const languages = Object.keys(languageTokenLimits);
export type Language = keyof typeof languageTokenLimits;

export type TokenLimit = (typeof languageTokenLimits)[Language];

export default languageTokenLimits;
