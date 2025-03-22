import { Router } from "express";
import getProductsMW from "../middlewares/stripe/product/getProductsMW";
import returnSubscriptionsMW from "../middlewares/stripe/subscription/returnSubscriptionsMW";
import validateCheckoutSessionDataMW from "../middlewares/stripe/subscription/validateCheckoutSessionDataMW";
import createCheckoutSessionMW from "../middlewares/stripe/product/createCheckoutSessionMW";
import returnCheckoutSessionUrlMW from "../middlewares/stripe/subscription/returnCheckoutSessionUrlMW";
import validateAuthorizationHeaderMW from "../middlewares/auth/validateAuthorizationHeaderMW";
import getAuthTokenMW from "../middlewares/auth/getAuthTokenMW";
import checkExistingUserFromAuthMW from "../middlewares/auth/checkExistingUserFromAuthMW";
import validateUserIdMW from "../middlewares/db/user/validateUserIdMW";
import validateAuthUserMW from "../middlewares/auth/validateAuthUserMW";
import checkExistingUserMW from "../middlewares/db/user/checkExistingUserMW";
import getUserIdFromRequestMW from "../middlewares/db/user/getUserIdFromRequestMW";
import getUserFromAuthMW from "../middlewares/auth/getUserFromAuthMW";
import getUserMW from "../middlewares/db/user/getUserMW";

const router = Router();

// Get products
router.get(
	"/",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	checkExistingUserFromAuthMW,
	getProductsMW,
	returnSubscriptionsMW
);

// Create checkout session
router.post(
	"/checkout",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	getUserFromAuthMW,
	getUserIdFromRequestMW("BODY"),
	validateUserIdMW,
	validateAuthUserMW,
	getUserMW,
	validateCheckoutSessionDataMW,
	createCheckoutSessionMW,
	returnCheckoutSessionUrlMW
);

export { router as productRoute };
