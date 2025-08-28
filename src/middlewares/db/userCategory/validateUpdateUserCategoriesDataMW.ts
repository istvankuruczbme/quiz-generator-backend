import { Request, Response, NextFunction } from "express";
import validateUpdateUserCategoriesData from "../../../utils/db/userCategory/validation/validateUpdateUserCategoriesData";
import { UpdateUserCategoryData } from "../../../utils/db/userCategory/validation/schemas/updateUserCategoriesSchema";

export default function validateUpdateUserCategoriesDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const userCategoriesData = validateUpdateUserCategoriesData(req.body);

		// Add user categories data to res.locals
		(res.locals.userCategoriesData as UpdateUserCategoryData) = userCategoriesData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
