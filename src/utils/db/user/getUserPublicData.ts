import { User, UserPublic } from "../../../types/userTypes";

export default function getUserPublicData(user: User): UserPublic {
	return {
		id: user.id,
		name: user.name,
		photoUrl: user.photoUrl,
	};
}
