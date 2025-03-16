import { Request, Response } from "express";
import { ProductWithPrice } from "../../../types/stripeTypes";

export default function returnSubscriptionsMW(_: Request, res: Response) {
	// Get subscriptions from res.locas
	const { subscriptions } = res.locals as { subscriptions: ProductWithPrice };

	// Return subscriptions
	res.status(200).json(subscriptions);
}
