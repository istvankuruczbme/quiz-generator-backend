import shuffleArray from "./shuffleArray";

export default function selectRandomElements<T>(array: T[], n = 1): T[] {
	// Shuffle array
	const shuffledArray = shuffleArray(array);

	// Return first n pieces of items
	return shuffledArray.slice(0, Math.min(n, array.length));
}
