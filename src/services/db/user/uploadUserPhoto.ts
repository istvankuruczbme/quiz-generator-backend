import { supabase } from "../../../config/supabase";

export default async function uploadUserPhoto(
	file: Express.Multer.File,
	userId: string
): Promise<string> {
	// Upload file
	const { data: uploadData, error: uploadError } = await supabase.storage
		.from("user_photos")
		.upload(`${userId}/${file.originalname}`, file.buffer);

	// Check if there was an error
	if (uploadError != null) throw uploadError;

	// Get file public URL
	const { data } = supabase.storage.from("user_photos").getPublicUrl(uploadData.path);

	// Return public URL of file
	return data.publicUrl;
}
