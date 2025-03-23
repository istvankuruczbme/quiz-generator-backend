export default function validateNullableString(string: unknown, prefix?: string): void {
	if (string === undefined) throw new Error(`${prefix || ""}missing`);
	if (string !== null && typeof string !== "string") throw new Error(`${prefix || ""}invalid`);
	if (typeof string === "string" && string === "") throw new Error(`${prefix || ""}invalid`);
}
