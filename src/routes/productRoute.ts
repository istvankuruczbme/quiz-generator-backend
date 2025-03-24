import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getProductsMW from "../middlewares/stripe/product/getProductsMW";
import returnSubscriptionsMW from "../middlewares/stripe/subscription/returnSubscriptionsMW";
import validateCheckoutSessionDataMW from "../middlewares/stripe/subscription/validateCheckoutSessionDataMW";
import createCheckoutSessionMW from "../middlewares/stripe/product/createCheckoutSessionMW";
import returnCheckoutSessionUrlMW from "../middlewares/stripe/subscription/returnCheckoutSessionUrlMW";
import getUserMW from "../middlewares/db/user/getUserMW";

const router = Router();

// Add authentication middlewares
router.use(authUserMW);

// Get products
router.get("/", getProductsMW, returnSubscriptionsMW);

// Create checkout session
router.post(
	"/checkout",
	getUserMW,
	validateCheckoutSessionDataMW,
	createCheckoutSessionMW,
	returnCheckoutSessionUrlMW
);

export { router as productRoute };
