export default function validateBearerAuthorizationHeader(
	authorization: string | string[] | undefined
): void {
	if (authorization == undefined || typeof authorization !== "string") {
		throw new Error("auth/header-missing");
	}

	if (!authorization.startsWith("Bearer")) throw new Error("auth/invalid-header");
}
