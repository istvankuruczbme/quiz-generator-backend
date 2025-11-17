export const LINE_TYPE_OPTIONS = ["normal", "list"] as const;
export type LineType = (typeof LINE_TYPE_OPTIONS)[number];
