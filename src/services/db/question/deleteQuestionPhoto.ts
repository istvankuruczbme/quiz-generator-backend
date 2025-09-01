import { questionPhotosBucket } from "../../../assets/storageBucketNames";
import AppError from "../../../classes/AppError";
import { supabase } from "../../../config/supabase";

export default async function deleteQuestionPhoto(questionId: string): Promise<void> {
	// Get question photo
	const { data, error: listError } = await supabase.storage
		.from(questionPhotosBucket)
		.list(questionId, {
			limit: 1,
		});

	// Check if there was an error
	if (listError) {
		throw new AppError({ message: "Error getting question photo.", details: listError.message });
	}

	// Check if question photo exists
	if (!data || data.length === 0) return;

	// Get question photo
	const file = data[0];

	// Check if question photo exists
	if (!file) return;

	// Delete file
	const { error: deleteError } = await supabase.storage
		.from(questionPhotosBucket)
		.remove([`${questionId}/${file.name}`]);

	// Check if there was an error
	if (deleteError != null) throw new AppError({ message: "Error deleting question photo." });
}
