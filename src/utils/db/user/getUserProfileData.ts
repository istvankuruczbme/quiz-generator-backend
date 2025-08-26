import { User, UserProfile } from "../../../types/userTypes";

export default function getUserProfileData(user: User): UserProfile {
	return {
		id: user.id,
		name: user.name,
		photoUrl: user.photoUrl,
		hasSubscription: user.subscriptionId != null,
		updatedAt: user.updatedAt,
		createdAt: user.createdAt,
	};
}
