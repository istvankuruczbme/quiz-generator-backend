import { Request, Response } from "express";
import { Product } from "../../../types/productTypes";

export default function returnProductsMW(_: Request, res: Response) {
	// Get products from res.locas
	const { products } = res.locals as { products: Product[] };

	// Return products
	res.status(200).json(products);
}
