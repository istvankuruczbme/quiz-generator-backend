export const LINE_TYPE_OPTIONS = ["normal", "normal-first", "list", "list-first"] as const;
export type LineType = (typeof LINE_TYPE_OPTIONS)[number];
