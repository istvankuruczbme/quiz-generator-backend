import { supabase } from "../../../config/supabase";

export default async function deleteUserPhoto(userId: string): Promise<void> {
	// Get user photo
	const { data, error: listError } = await supabase.storage.from("user_photos").list(userId, {
		limit: 1,
	});

	// Check if there was an error
	if (listError != null) throw listError;

	// Check if user photo exists
	if (data == null || data.length === 0) return;

	// Get user photo
	const file = data[0];

	// Check if user photo exists
	if (file == undefined) return;

	// Delete file
	const { error: removeError } = await supabase.storage
		.from("user_photos")
		.remove([`${userId}/${file.name}`]);

	// Check if there was an error
	if (removeError != null) throw removeError;
}
