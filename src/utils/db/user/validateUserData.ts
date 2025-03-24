import validateEmail from "../../validation/validateEmail";
import validateNonEmptyString from "../../validation/validateNonEmptyString";
import validateNullableString from "../../validation/validateNullableString";
import validateUserPhoto from "./validateUserPhoto";

export default function validateUserData(name: unknown, email: unknown, photoUrl: unknown): void {
	validateNonEmptyString(name, "user/name-");
	validateEmail(email, "user/");
	validateUserPhoto(photoUrl);
}
