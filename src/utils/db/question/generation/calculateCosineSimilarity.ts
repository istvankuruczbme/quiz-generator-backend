import calculateDotProduct from "../../../math/calculateDotProduct";
import calculateVectorNorm from "../../../math/calculateVectorNorm";

export default function calculateCosineSimilarity(vector1: number[], vector2: number[]): number {
	// Check same vector length
	if (vector1.length !== vector2.length) throw new Error("quiz/generation/invalid-embeddings");

	// Calculate dot product and vector norms
	const dp = calculateDotProduct(vector1, vector2);
	const n1 = calculateVectorNorm(vector1);
	const n2 = calculateVectorNorm(vector2);

	// Check norms
	if (n1 === 0 || n2 === 0) return 0;

	// Return cosine similarity
	return dp / (n1 * n2);
}
