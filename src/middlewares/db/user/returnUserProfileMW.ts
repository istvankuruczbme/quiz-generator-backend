import { Request, Response } from "express";
import { UserProfile } from "../../../types/userTypes";

export default function returnUserProfileMW(_: Request, res: Response) {
	// Get user from res.locals
	const { userProfile } = res.locals as { userProfile: UserProfile };

	// Return user
	res.status(200).json(userProfile);
}
