import { User, UserPublic } from "../../../types/userTypes";

export default function getUserPublicData(user: UserSelect): UserPublic {
	return {
		id: user.id,
		name: user.name,
		photoUrl: user.photoUrl,
	};
}
