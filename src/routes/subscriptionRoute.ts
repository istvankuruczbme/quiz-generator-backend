import { Router } from "express";
import getAllSubscriptionsMW from "../middlewares/subscription/getAllSubscriptionsMW";
import returnSubscriptionsMW from "../middlewares/subscription/returnSubscriptionsMW";
import getUserIdFromRequestMW from "../middlewares/user/getUserIdFromRequestMW";
import checkExistingUserMW from "../middlewares/user/checkExistingUserMW";
import validateUserIdMW from "../middlewares/user/validateUserIdMW";

const router = Router();

router.get(
	"/",
	getUserIdFromRequestMW("QUERY"),
	validateUserIdMW,
	checkExistingUserMW,
	getAllSubscriptionsMW,
	returnSubscriptionsMW
);

export { router as subscriptionRoute };

// export default function subscriptionRoute(
// 	fastify: FastifyInstance,
// 	_: FastifyPluginOptions,
// 	done: () => void
// ) {
// 	// Get app from instance
// 	const app = getFastifyAppWithTypeProvider(fastify);

// 	// Get all subscriptions
// 	app.get("/", { schema: getSubscriptionsSchema }, async () => {
// 		try {
// 			const subscriptions = await getSubscriptions();
// 			return subscriptions;
// 		} catch (err) {
// 			console.log("Error fetching the subscriptions.");
// 			return err;
// 		}
// 	});

// 	// Create checkout session
// 	app.post("/checkout", { schema: createCheckoutSessionSchema }, async (req) => {
// 		// Get customer and subscription price
// 		const { customerId, subscriptionPriceId } = req.body;

// 		try {
// 			const session = await stripe.checkout.sessions.create({
// 				customer: customerId,
// 				mode: "subscription",
// 				line_items: [
// 					{
// 						price: subscriptionPriceId,
// 						quantity: 1,
// 					},
// 				],
// 				success_url: `${process.env.CLIENT_URL}/sign-up?page=categories`,
// 				cancel_url: `${process.env.CLIENT_URL}/sign-up?page=subscription`,
// 			});

// 			// Check if session has a URL
// 			if (session.url == null) throw new Error("subscription/checkout-failed");

// 			return { url: session.url };
// 		} catch (err) {
// 			console.log("Error creating checkout session.", err);
// 		}
// 	});

// 	// Go to next plugin
// 	done();
// }
