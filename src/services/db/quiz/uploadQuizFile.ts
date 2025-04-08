import { quizDocumentsBucket } from "../../../assets/storageBucketNames";
import { supabase } from "../../../config/supabase";

export default async function uploadQuizFile(
	file: Express.Multer.File,
	quizId: string
): Promise<void> {
	// Upload file
	const { error } = await supabase.storage
		.from(quizDocumentsBucket)
		.upload(`${quizId}/${file.originalname}`, file.buffer);

	// Check if there was an error
	if (error != null) throw error;
}
