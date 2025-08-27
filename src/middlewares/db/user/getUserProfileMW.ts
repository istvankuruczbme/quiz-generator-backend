import { Request, Response, NextFunction } from "express";
import { UserSelect, UserProfile } from "../../../types/userTypes";
import getUserProfileData from "../../../utils/db/user/getUserProfileData";

export default async function getUserProfileMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: UserSelect };

	// Get user profile data
	const userProfile = getUserProfileData(user);

	// Add profile data to res.locals
	(res.locals.userProfile as UserProfile) = userProfile;

	// Go to next MW
	return next();
}
