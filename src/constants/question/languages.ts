export const LANGUAGES = ["eng", "hun"] as const;
export type Language = (typeof LANGUAGES)[number];
