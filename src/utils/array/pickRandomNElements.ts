import shuffleArray from "./shuffleArray";

export default function pickRandomNElements<T>(array: T[], n: number): T[] {
	// Shuffle array
	const shuffledArray = shuffleArray(array);

	// Return first n pieces of items
	return shuffledArray.slice(0, Math.min(n, array.length));
}
