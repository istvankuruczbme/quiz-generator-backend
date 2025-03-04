export default function validateEmail(email: unknown, prefix?: string): void {
	if (email == undefined) throw new Error(`${prefix || ""}email-missing`);

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (typeof email !== "string" || !emailRegex.test(email)) {
		throw new Error(`${prefix || ""}invalid-email`);
	}
}
