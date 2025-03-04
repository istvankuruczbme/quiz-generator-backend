export default function validateNullableString(photoUrl: unknown, prefix?: string): void {
	if (photoUrl === undefined) throw new Error(`${prefix || ""}missing`);
	if (photoUrl !== null && typeof photoUrl !== "string") throw new Error(`${prefix || ""}invalid`);
	if (typeof photoUrl === "string" && photoUrl === "") throw new Error(`${prefix || ""}invalid`);
}
