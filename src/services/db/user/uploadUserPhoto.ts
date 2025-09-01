import { userPhotosBucket } from "../../../assets/storageBucketNames";
import AppError from "../../../classes/AppError";
import { supabase } from "../../../config/supabase";

export default async function uploadUserPhoto(
	file: Express.Multer.File,
	userId: string
): Promise<string> {
	// Upload file
	const { data: uploadData, error: uploadError } = await supabase.storage
		.from(userPhotosBucket)
		.upload(`${userId}/${file.originalname}`, file.buffer);

	// Check if there was an error
	if (uploadError) throw new AppError({ message: "Error uploading user photo." });

	// Get file public URL
	const { data } = supabase.storage.from(userPhotosBucket).getPublicUrl(uploadData.path);

	// Return public URL of file
	return data.publicUrl;
}
