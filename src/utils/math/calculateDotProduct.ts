export default function calculateDotProduct(vector1: number[], vector2: number[]): number {
	return vector1.reduce((sum, value, i) => {
		if (vector2[i] == undefined) return sum;
		return sum + value * vector2[i];
	}, 0);
}
