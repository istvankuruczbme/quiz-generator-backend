import { Request, Response, NextFunction } from "express";
import validateNewSubscriptionData from "../../services/subscription/validateNewSubscriptionData";

export default function validateNewSubscriptionDataMW(
	req: Request,
	_: Response,
	next: NextFunction
) {
	// Get price ID from req.body
	const { priceId } = req.body as { priceId: unknown };

	try {
		// Validate new subscription data
		validateNewSubscriptionData(priceId);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
