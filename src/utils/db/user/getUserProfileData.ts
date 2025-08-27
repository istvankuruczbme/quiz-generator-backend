import { UserSelect, UserProfile } from "../../../types/userTypes";

export default function getUserProfileData(user: UserSelect): UserProfile {
	return {
		id: user.id,
		name: user.name,
		photoUrl: user.photoUrl,
		hasSubscription: user.subscriptionId != null,
		updatedAt: user.updatedAt,
		createdAt: user.createdAt,
	};
}
