import validateEmail from "../../utils/validation/validateEmail";
import validateNonEmptyString from "../../utils/validation/validateNonEmptyString";

export default function validateUserPersonalData(name: unknown, email: unknown): void {
	validateNonEmptyString(name, "user/name-");
	validateEmail(email, "user/");
}
