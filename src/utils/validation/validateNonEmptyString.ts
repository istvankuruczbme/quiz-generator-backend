export default function validateNonEmptyString(name: unknown, prefix?: string): void {
	if (name == undefined) throw new Error(`${prefix || ""}missing`);

	if (typeof name !== "string" || name === "") {
		throw new Error(`${prefix || ""}invalid`);
	}
}
