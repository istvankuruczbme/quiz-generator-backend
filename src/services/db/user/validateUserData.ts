import validateEmail from "../../../utils/validation/validateEmail";
import validateNonEmptyString from "../../../utils/validation/validateNonEmptyString";
import validateNullableString from "../../../utils/validation/validateNullableString";
import validateUserPhoto from "./validateUserPhoto";

export default function validateUserData(name: unknown, email: unknown, photoUrl: unknown): void {
	validateNonEmptyString(name, "user/name-");
	validateEmail(email, "user/");
	validateUserPhoto(photoUrl);
}
