import { Request, Response, NextFunction } from "express";
import getProducts from "../../../services/stripe/product/getProducts";
import { ProductWithPrice } from "../../../types/stripeTypes";

export default async function getProductsMW(_: Request, res: Response, next: NextFunction) {
	try {
		// Get subscriptions
		const subscriptions = await getProducts();

		// Add subscriptions to res.locals
		(res.locals.subscriptions as ProductWithPrice[]) = subscriptions;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
