import validateNonEmptyString from "../../../utils/validation/validateNonEmptyString";

export default function validateUserPersonalData(name: unknown): void {
	validateNonEmptyString(name, "user/name-");
}
