import { Request, Response, NextFunction } from "express";
import validateCheckoutSessionData from "../../services/subscription/validateCheckoutSessionData";

export default function validateCheckoutSessionDataMW(
	req: Request,
	_: Response,
	next: NextFunction
) {
	// Get customer ID and price ID from request
	const { customerId, priceId, successUrl } = req.body as {
		customerId: unknown;
		priceId: unknown;
		successUrl: unknown;
	};

	try {
		// Validation
		validateCheckoutSessionData(customerId, priceId, successUrl);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
