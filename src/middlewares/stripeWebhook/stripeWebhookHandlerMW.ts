import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import updateUserSubscriptionId from "../../services/user/updateUserSubscriptionId";
import getUserByCustomerId from "../../services/user/getUserByCustomerId";

export default async function stripeWebhookHandlerMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Event
	const event: Stripe.Event = req.body;
	console.log("Event:", event);

	switch (event.type) {
		case "customer.subscription.created": {
			// Get subscription ID
			const subscriptionId = event.data.object.id;
			const customerId = event.data.object.customer as string;

			try {
				// Get user by customer ID
				const user = await getUserByCustomerId(customerId);

				// Check if user exists
				if (user == undefined) throw new Error("user/not-found");

				// Update user with subscription ID
				await updateUserSubscriptionId(user.id, subscriptionId);

				console.log("User subscription created.");
			} catch (err) {
				return next(err);
			}
		}
	}

	res.status(200).json({ message: "Webhook event received." });
}
