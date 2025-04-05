import subscriptionFeatures, { ProductId } from "../../../assets/subscriptionFeatures";
import { Product } from "../../../types/productTypes";
import { ProductWithPrice } from "../../../types/stripeTypes";

export default function formatProductData(product: ProductWithPrice): Product {
	return {
		id: product.id,
		name: product.name,
		description: product.description,
		photoUrl: product.images[0] || null,
		price: {
			id: product.default_price.id,
			amount: product.default_price.unit_amount as number,
			currency: product.default_price.currency,
		},
		maxQuizCount: subscriptionFeatures[product.id as ProductId].maxQuizCount,
		maxQuestionCountPerQuiz:
			subscriptionFeatures[product.id as ProductId].maxQuestionCountPerQuiz,
	};
}
