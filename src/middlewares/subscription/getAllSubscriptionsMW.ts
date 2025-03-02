import { Request, Response, NextFunction } from "express";
import getAllSubscriptions from "../../services/subscription/getAllSubscriptions";
import { ProductWithPrice } from "../../types/stripeTypes";

export default async function getAllSubscriptionsMW(_: Request, res: Response, next: NextFunction) {
	try {
		// Get subscriptions
		const subscriptions = await getAllSubscriptions();

		// Add subscriptions to res.locals
		(res.locals.subscriptions as ProductWithPrice[]) = subscriptions;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
