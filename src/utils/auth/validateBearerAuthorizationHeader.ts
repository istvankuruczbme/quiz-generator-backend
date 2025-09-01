import AppError from "../../classes/AppError";

export default function validateBearerAuthorizationHeader(authorization: string | undefined): void {
	if (
		authorization == undefined ||
		typeof authorization !== "string" ||
		!authorization.startsWith("Bearer")
	) {
		throw new AppError({ message: "Unauthorized request", status: 403 });
	}
}
