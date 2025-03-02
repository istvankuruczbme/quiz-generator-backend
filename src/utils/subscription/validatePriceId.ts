export default function validatePriceId(id: unknown, prefix?: string): void {
	if (id == undefined) throw new Error(`${prefix || ""}id-missing`);

	if (typeof id !== "string" || id.length !== 30 || !id.startsWith("price_")) {
		throw new Error(`${prefix || ""}invalid-id`);
	}
}
