export default function validateNonEmptyString(string: unknown, prefix?: string): void {
	if (string == undefined) throw new Error(`${prefix || ""}missing`);

	if (typeof string !== "string" || string === "") {
		throw new Error(`${prefix || ""}invalid`);
	}
}
