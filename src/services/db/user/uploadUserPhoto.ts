import { supabase } from "../../../config/supabase";

export default async function uploadUserPhoto(
	file: Express.Multer.File,
	userId: string
): Promise<string> {
	// Upload file
	const { data: uploadData, error: uploadError } = await supabase.storage
		.from(process.env.SUPABASE_STORAGE_USER_PHOTOS_BUCKET!)
		.upload(`${userId}/${file.originalname}`, file.buffer);

	// Check if there was an error
	if (uploadError != null) throw uploadError;

	// Get file public URL
	const { data } = supabase.storage
		.from(process.env.SUPABASE_STORAGE_USER_PHOTOS_BUCKET!)
		.getPublicUrl(uploadData.path);

	// Return public URL of file
	return data.publicUrl;
}
