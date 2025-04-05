import { Request, Response, NextFunction } from "express";
import { User } from "../../../types/userTypes";
import updateUser from "../../../services/db/user/updateUser";

export default async function removeUserPhotoUrlMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	// Check if user has a photo URL
	if (user.photoUrl == null) return next();

	try {
		// Update user
		await updateUser(user.id, { photoUrl: null });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
