import { questionPhotosBucket } from "../../../assets/storageBucketNames";
import AppError from "../../../classes/AppError";
import { supabase } from "../../../config/supabase";

export default async function uploadQuestionPhoto(
	file: Express.Multer.File,
	questionId: string
): Promise<string> {
	// Upload file
	const { data: uploadData, error: uploadError } = await supabase.storage
		.from(questionPhotosBucket)
		.upload(`${questionId}/${file.originalname}`, file.buffer);

	// Check if there was an error
	if (uploadError) throw new AppError({ message: "Error uploading question photo." });

	// Get file public URL
	const { data } = supabase.storage.from(questionPhotosBucket).getPublicUrl(uploadData.path);

	// Return public URL of file
	return data.publicUrl;
}
