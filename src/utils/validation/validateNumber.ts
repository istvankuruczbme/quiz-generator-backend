export default function validateNumber(number: unknown, prefix?: string): void {
	if (number == null) throw new Error(`${prefix || ""}-missing`);
	if (typeof number !== "number" || isNaN(number)) {
		throw new Error(`${prefix || ""}-invalid`);
	}
}
