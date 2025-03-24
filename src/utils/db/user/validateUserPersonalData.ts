import validateNonEmptyString from "../../validation/validateNonEmptyString";

export default function validateUserPersonalData(name: unknown): void {
	validateNonEmptyString(name, "user/name-");
}
