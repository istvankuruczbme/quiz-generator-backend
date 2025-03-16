import getPropertyFromRequest from "../../../utils/general/getPropertyFromRequest";
import { IdResource } from "../../../types/generalTypes";
import { NextFunction, Request, Response } from "express";

export default function getUserIdFromRequestMW(resource: IdResource) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			// Get userId from request object
			const userId = getPropertyFromRequest(req, resource, "userId");

			// Add userId to res.locals
			(res.locals.userId as unknown) = userId;

			// Go to next MW
			return next();
		} catch (err) {
			return next(err);
		}
	};
}
