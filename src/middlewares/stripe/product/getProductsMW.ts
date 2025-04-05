import { Request, Response, NextFunction } from "express";
import getProducts from "../../../services/stripe/product/getProducts";
import { ProductWithPrice } from "../../../types/stripeTypes";

export default async function getProductsMW(_: Request, res: Response, next: NextFunction) {
	try {
		// Get products
		const products = await getProducts();

		// Add products to res.locals
		(res.locals.products as ProductWithPrice[]) = products;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
