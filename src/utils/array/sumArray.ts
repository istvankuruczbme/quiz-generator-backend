export default function sumArray(array: number[]): number {
	return array.reduce((total, current) => total + current, 0);
}
