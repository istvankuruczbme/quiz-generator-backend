import { Router } from "express";
import getUserIdFromRequestMW from "../middlewares/db/user/getUserIdFromRequestMW";
import checkExistingUserMW from "../middlewares/db/user/checkExistingUserMW";
import validateUserIdMW from "../middlewares/db/user/validateUserIdMW";
import checkExistingUserByCustomerIdMW from "../middlewares/db/user/checkExistingUserByCustomerIdMW";
import getProductsMW from "../middlewares/stripe/product/getProductsMW";
import returnSubscriptionsMW from "../middlewares/stripe/subscription/returnSubscriptionsMW";
import validateCheckoutSessionDataMW from "../middlewares/stripe/subscription/validateCheckoutSessionDataMW";
import createCheckoutSessionMW from "../middlewares/stripe/product/createCheckoutSessionMW";
import returnCheckoutSessionUrlMW from "../middlewares/stripe/subscription/returnCheckoutSessionUrlMW";

const router = Router();

// Get subscriptions
router.get(
	"/",
	getUserIdFromRequestMW("QUERY"),
	validateUserIdMW,
	checkExistingUserMW,
	getProductsMW,
	returnSubscriptionsMW
);

// Create checkout session
router.post(
	"/checkout",
	validateCheckoutSessionDataMW,
	checkExistingUserByCustomerIdMW,
	createCheckoutSessionMW,
	returnCheckoutSessionUrlMW
);

export { router as productRoute };
