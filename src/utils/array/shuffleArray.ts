export default function shuffleArray<T>(array: T[]): T[] {
	return array.toSorted(() => Math.random() - 0.5);
}
