import { quizDocumentsBucket } from "../../../assets/storageBucketNames";
import AppError from "../../../classes/AppError";
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
	if (error) {
		// Check duplicate file error
		if ("statusCode" in error && error.statusCode === "409") {
			throw new AppError({ message: "File was already uploaded.", status: 404 });
		}

		// Throw original error
		throw new AppError({ message: "Error uploading file." });
	}
}
