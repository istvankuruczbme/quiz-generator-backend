import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import updateUserSubscriptionId from "../../../services/db/user/updateUserSubscriptionId";
import getUserByCustomerId from "../../../services/db/user/getUserByCustomerId";
import AppError from "../../../classes/AppError";

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
			// Get subscription and customer
			const subscription = event.data.object;
			const customerId = subscription.customer as string;

			try {
				// Get user by customer ID
				const user = await getUserByCustomerId(customerId);

				// Check if user exists
				if (!user) throw new AppError({ message: "user/not-found", status: 404 });

				// Update user with subscription ID
				await updateUserSubscriptionId(user.id, subscription.id);

				console.log("User subscription created.");
			} catch (err) {
				return next(err);
			}

			break;
		}
		case "customer.subscription.deleted": {
			// Get subscription and customer
			const subscription = event.data.object;
			const customerId = subscription.customer as string;

			try {
				// Get user by customer ID
				const user = await getUserByCustomerId(customerId);

				// Check if user exists
				if (!user) throw new AppError({ message: "user/not-found", status: 404 });

				// Delete user subscription ID
				await updateUserSubscriptionId(user.id, null);

				console.log("User subscription deleted.");
			} catch (err) {
				return next(err);
			}

			break;
		}
	}

	res.status(200).json({ message: "Webhook event received." });
}
