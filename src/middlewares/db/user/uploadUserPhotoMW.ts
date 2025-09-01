import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import deleteUserPhoto from "../../../services/db/user/deleteUserPhoto";
import uploadUserPhoto from "../../../services/db/user/uploadUserPhoto";
import { UpdateUserData } from "../../../utils/db/user/validation/schemas/upadteUserSchema";

export default async function uploadUserPhotoMW(req: Request, res: Response, next: NextFunction) {
	// Get user and user data
	const { user, userData } = res.locals as { user: UserSelect; userData: UpdateUserData };
	// Get file from request body
	const { file } = req as { file?: Express.Multer.File };

	try {
		// Delete user photo
		if (user.photoUrl && (file || userData.photoUrl === null)) {
			await deleteUserPhoto(user.id);
		}

		// No file
		if (!file) return next();

		// Upload new file
		const photoUrl = await uploadUserPhoto(file, user.id);

		// Update user data with photo URL
		(res.locals.userData as UpdateUserData) = {
			...userData,
			photoUrl,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
