import { User, UserProfile } from "../../../types/userTypes";

export default function getUserProfileData(user: User): UserProfile {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		photoUrl: user.photoUrl,
		updatedAt: user.updatedAt,
		createdAt: user.createdAt,
	};
}
