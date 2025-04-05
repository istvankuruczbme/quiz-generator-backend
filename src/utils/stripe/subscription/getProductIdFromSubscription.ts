import Stripe from "stripe";
import subscriptionFeatures, { ProductId } from "../../../assets/subscriptionFeatures";

export default function getProductIdFromSubscription(subscription: Stripe.Subscription): ProductId {
	// Get product ID
	const productId = subscription.items.data[0]?.price.product;

	// Validation
	if (productId == undefined || typeof productId !== "string") {
		throw new Error("user/subscription/product-id-missing");
	}
	if (!Object.keys(subscriptionFeatures).includes(productId)) {
		throw new Error("user/subscription/invalid-product-id");
	}

	// Return product ID
	return productId as ProductId;
}
