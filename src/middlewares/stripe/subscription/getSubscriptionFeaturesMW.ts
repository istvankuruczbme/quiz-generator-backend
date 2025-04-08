import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import getProductIdFromSubscription from "../../../utils/stripe/subscription/getProductIdFromSubscription";
import subscriptionFeatures, { SubscriptionFeatures } from "../../../assets/subscriptionFeatures";

export default function getSubscriptionFeaturesMW(_: Request, res: Response, next: NextFunction) {
	// Get subscription from res.locals
	const { subscription } = res.locals as { subscription: Stripe.Subscription };

	// Get product ID from subscription
	const productId = getProductIdFromSubscription(subscription);

	// Get features for this product
	const features = subscriptionFeatures[productId];

	// Add subscription features to res.locals
	(res.locals.subscriptionFeatures as SubscriptionFeatures) = features;

	// Go to next MW
	return next();
}
