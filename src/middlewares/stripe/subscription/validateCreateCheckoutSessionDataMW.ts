import { Request, Response, NextFunction } from "express";
import validateCreateCheckoutSessionData from "../../../utils/stripe/checkoutSession/validation/validateCreateCheckoutSessionData";
import { CreateCheckoutSessionData } from "../../../utils/stripe/checkoutSession/validation/schemas/createCheckoutSessionSchema";

export default function validateCreateCheckoutSessionDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const checkoutSessionData = validateCreateCheckoutSessionData(req.body);

		// Add checkout session data to res.locals
		(res.locals.checkoutSessionData as CreateCheckoutSessionData) = checkoutSessionData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
