export default function validateName(name: unknown, prefix?: string): void {
	if (name == undefined) throw new Error(`${prefix || ""}name-missing`);

	if (typeof name !== "string" || name === "") {
		throw new Error(`${prefix || ""}invalid-name`);
	}
}
