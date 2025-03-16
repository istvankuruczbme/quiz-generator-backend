import { Request, Response, NextFunction } from "express";
import deleteUserPhoto from "../../../services/db/user/deleteUserPhoto";

export default async function deleteUserPhotoMW(_: Request, res: Response, next: NextFunction) {
	// Get user ID from res.locals
	const { userId } = res.locals as { userId: string };

	try {
		// Delete user photo
		await deleteUserPhoto(userId);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
