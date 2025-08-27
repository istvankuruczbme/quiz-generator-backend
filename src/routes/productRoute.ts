import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getProductsMW from "../middlewares/stripe/product/getProductsMW";
import returnProductsMW from "../middlewares/stripe/product/returnProductsMW";
import validateCreateCheckoutSessionDataMW from "../middlewares/stripe/subscription/validateCreateCheckoutSessionDataMW";
import createCheckoutSessionMW from "../middlewares/stripe/product/createCheckoutSessionMW";
import returnCheckoutSessionUrlMW from "../middlewares/stripe/subscription/returnCheckoutSessionUrlMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import formatProductsDataMW from "../middlewares/stripe/product/formatProductsDataMW";
import createCustomerMW from "../middlewares/stripe/customer/createCustomerMW";

const router = Router();

// Add authentication middlewares
router.use(authUserMW);

// Get products
router.get("/", getProductsMW, formatProductsDataMW, returnProductsMW);

// Create checkout session
router.post(
	"/checkout",
	getUserMW,
	validateCreateCheckoutSessionDataMW,
	createCustomerMW,
	createCheckoutSessionMW,
	returnCheckoutSessionUrlMW
);

export { router as productRoute };
