import { Request, Response, NextFunction } from "express";
import { ProductWithPrice } from "../../../types/stripeTypes";
import formatProductData from "../../../utils/stripe/product/formatProductData";
import { Product } from "../../../types/productTypes";

export default function formatProductsDataMW(_: Request, res: Response, next: NextFunction) {
	// Get products from res.locas
	const { products } = res.locals as { products: ProductWithPrice[] };

	// Format products
	const formattedProducts = products.map((product) => formatProductData(product));

	// Update products in res.locals
	(res.locals.products as Product[]) = formattedProducts;

	// Go to next MW
	return next();
}
