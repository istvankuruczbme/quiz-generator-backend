import { axios } from "../../config/axios";

export default async function createEmbeddings(textArray: string[]): Promise<number[][]> {
	const { data } = await axios.post<number[][]>("/embed", { chunks: textArray });
	return data;
}
