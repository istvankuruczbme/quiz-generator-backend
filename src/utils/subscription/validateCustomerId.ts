export default function validateCustomerId(id: unknown, prefix?: string): void {
	if (id == undefined) throw new Error(`${prefix || ""}missing-id`);

	if (typeof id !== "string" || id.length !== 18 || !id.startsWith("cus_")) {
		throw new Error(`${prefix || ""}invalid-id`);
	}
}
