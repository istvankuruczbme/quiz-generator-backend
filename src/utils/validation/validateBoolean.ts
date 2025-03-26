export default function validateBoolean(variable: unknown, prefix?: string): void {
	if (typeof variable !== "boolean") throw new Error(`${prefix || ""}-invalid`);
}
