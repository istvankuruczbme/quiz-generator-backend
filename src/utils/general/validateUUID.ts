export default function validateUUID(uuid: unknown, prefix?: string): void {
	if (uuid == undefined) throw new Error(`${prefix || ""}id-missing`);

	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	if (typeof uuid !== "string" || !uuidRegex.test(uuid)) {
		throw new Error(`${prefix || ""}invalid-id`);
	}
}
