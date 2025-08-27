import { Request, Response, NextFunction } from "express";
import validateUpdateUserData from "../../../utils/db/user/validation/validateUpdateUserData";
import { UpdateUserData } from "../../../utils/db/user/validation/schemas/upadteUserSchema";

export default function validateUpdateUserDataMW(req: Request, res: Response, next: NextFunction) {
	try {
		// Validation
		const userData = validateUpdateUserData(req.body);

		// Add user data to res.locals
		(res.locals.userData as UpdateUserData) = userData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
