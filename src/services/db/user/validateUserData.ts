import validateEmail from "../../../utils/validation/validateEmail";
import validateNonEmptyString from "../../../utils/validation/validateNonEmptyString";
import validateNullableString from "../../../utils/validation/validateNullableString";
import validateUUID from "../../../utils/validation/validateUUID";

export default function validateUserData(
	id: unknown,
	name: unknown,
	email: unknown,
	photoUrl: unknown
): void {
	validateUUID(id, "user/");
	validateNonEmptyString(name, "user/name-");
	validateEmail(email, "user/");
	validateNullableString(photoUrl, "user/photo-url-");
}
