export default function validateInteger(integer: unknown, prefix?: string): void {
	if (integer == null) throw new Error(`${prefix || ""}-missing`);
	if (typeof integer !== "number" || !Number.isInteger(integer)) {
		throw new Error(`${prefix || ""}-invalid`);
	}
}
