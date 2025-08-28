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

	// No file
	if (!file) return next();

	try {
		// Delete user photo (if he has)
		if (user.photoUrl) await deleteUserPhoto(user.id);

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
