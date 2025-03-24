import { Request, Response, NextFunction } from "express";

export default async function getUserProfileDataMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };
}
