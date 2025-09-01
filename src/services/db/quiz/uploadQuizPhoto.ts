import { quizPhotosBucket } from "../../../assets/storageBucketNames";
import AppError from "../../../classes/AppError";
import { supabase } from "../../../config/supabase";

export default async function uploadQuizPhoto(
	file: Express.Multer.File,
	quizId: string
): Promise<string> {
	// Upload file
	const { data: uploadData, error: uploadError } = await supabase.storage
		.from(quizPhotosBucket)
		.upload(`${quizId}/${file.originalname}`, file.buffer);

	// Check if there was an error
	if (uploadError) throw new AppError({ message: "Error uploading quiz photo." });

	// Get file public URL
	const { data } = supabase.storage.from(quizPhotosBucket).getPublicUrl(uploadData.path);

	// Return public URL of file
	return data.publicUrl;
}
