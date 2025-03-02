import validateEmail from "../../utils/general/validateEmail";
import validateName from "../../utils/general/validateName";
import validateUUID from "../../utils/general/validateUUID";

export default function validateUserData(id: unknown, name: unknown, email: unknown): void {
	// Error prefix
	const errorPrefix = "user/";

	// Validate values
	validateUUID(id, errorPrefix);
	validateName(name, errorPrefix);
	validateEmail(email, errorPrefix);
}
