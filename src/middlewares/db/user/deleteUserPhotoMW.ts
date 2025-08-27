import { Request, Response, NextFunction } from "express";
import deleteUserPhoto from "../../../services/db/user/deleteUserPhoto";
import { UserSelect } from "../../../types/userTypes";

export default async function deleteUserPhotoMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: UserSelect };

	// Check if user has a photo URL
	if (user.photoUrl == null) return next();

	try {
		// Delete user photo
		await deleteUserPhoto(user.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
