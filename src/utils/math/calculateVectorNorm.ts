export default function calculateVectorNorm(vector: number[]): number {
	return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}
