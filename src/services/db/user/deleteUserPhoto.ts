import { userPhotosBucket } from "../../../assets/storageBucketNames";
import AppError from "../../../classes/AppError";
import { supabase } from "../../../config/supabase";

export default async function deleteUserPhoto(userId: string): Promise<void> {
	// Get user photo
	const { data, error: listError } = await supabase.storage.from(userPhotosBucket).list(userId, {
		limit: 1,
	});

	// Check if there was an error
	if (listError) {
		throw new AppError({ message: "Error getting user photo.", details: listError.message });
	}

	// Check if user photo exists
	if (!data || data.length === 0) return;

	// Get user photo
	const file = data[0];

	// Check if user photo exists
	if (!file) return;

	// Delete file
	const { error: deleteError } = await supabase.storage
		.from(userPhotosBucket)
		.remove([`${userId}/${file.name}`]);

	// Check if there was an error
	if (deleteError) {
		throw new AppError({ message: "Error deleting user photo.", details: deleteError.message });
	}
}
