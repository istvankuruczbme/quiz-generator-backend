import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import deleteUserPhoto from "../../services/user/deleteUserPhoto";
import uploadUserPhoto from "../../services/user/uploadUserPhoto";

export default async function uploadUserPhotoMW(req: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };
	// Get file from request body
	const { file } = req as { file: Express.Multer.File | undefined };

	// No file
	if (file == undefined) {
		// Add photoUrl to res.locals
		(res.locals.photoUrl as string | null) = null;

		// Go to next MW
		return next();
	} else {
		// User already has a photo
		if (user.photoUrl != null) {
			try {
				// Delete file
				await deleteUserPhoto(user.id);
			} catch (err) {
				return next(err);
			}
		}

		try {
			// Upload new file
			const photoUrl = await uploadUserPhoto(file, user.id);

			// Add photo URL to res.locals
			(res.locals.photoUrl as string) = photoUrl;

			// Go to next MW
			return next();
		} catch (err) {
			return next(err);
		}
	}
}
