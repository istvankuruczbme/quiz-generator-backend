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
	if (error != null) {
		// Check duplicate file error
		if ("statusCode" in error && error.statusCode === "409") {
			throw new Error("quiz/generation/file-exists");
		}

		// Throw original error
		throw error;
	}
}
