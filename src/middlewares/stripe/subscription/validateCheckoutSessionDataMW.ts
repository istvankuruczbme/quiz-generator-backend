import { Request, Response, NextFunction } from "express";
import validateCheckoutSessionData from "../../../services/stripe/checkoutSession/validateCheckoutSessionData";

export default function validateCheckoutSessionDataMW(
	req: Request,
	_: Response,
	next: NextFunction
) {
	// Get customer ID and price ID from request
	const { priceId, successUrl } = req.body as {
		priceId: unknown;
		successUrl: unknown;
	};

	try {
		// Validation
		validateCheckoutSessionData(priceId, successUrl);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
