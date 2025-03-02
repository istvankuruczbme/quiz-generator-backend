import { Router } from "express";
import getAllSubscriptionsMW from "../middlewares/subscription/getAllSubscriptionsMW";
import returnSubscriptionsMW from "../middlewares/subscription/returnSubscriptionsMW";
import getUserIdFromRequestMW from "../middlewares/user/getUserIdFromRequestMW";
import checkExistingUserMW from "../middlewares/user/checkExistingUserMW";
import validateUserIdMW from "../middlewares/user/validateUserIdMW";
import validateCheckoutSessionDataMW from "../middlewares/subscription/validateCheckoutSessionDataMW";
import createCheckoutSessionMW from "../middlewares/subscription/createCheckoutSessionMW";
import returnCheckoutSessionUrlMW from "../middlewares/subscription/returnCheckoutSessionUrlMW";
import checkExistingUserByCustomerIdMW from "../middlewares/user/checkExistingUserByCustomerIdMW";

const router = Router();

// Get subscriptions
router.get(
	"/",
	getUserIdFromRequestMW("QUERY"),
	validateUserIdMW,
	checkExistingUserMW,
	getAllSubscriptionsMW,
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

export { router as subscriptionRoute };
