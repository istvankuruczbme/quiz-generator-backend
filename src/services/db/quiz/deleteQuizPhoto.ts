import { quizPhotosBucket } from "../../../assets/storageBucketNames";
import AppError from "../../../classes/AppError";
import { supabase } from "../../../config/supabase";

export default async function deleteQuizPhoto(quizId: string): Promise<void> {
	// Get quiz photo
	const { data, error: listError } = await supabase.storage.from(quizPhotosBucket).list(quizId, {
		limit: 1,
	});

	// Check if there was an error
	if (listError) {
		throw new AppError({ message: "Error getting quiz photo.", details: listError.message });
	}

	console.log("Quiz photo data:", data);

	// Check if data exists
	if (!data || data.length === 0) return;

	// Get quiz photo
	const file = data[0];

	// Check if quiz photo exists
	if (!file) return;

	// Delete file
	const { error: deleteError } = await supabase.storage
		.from(quizPhotosBucket)
		.remove([`${quizId}/${file.name}`]);

	// Check if there was an error
	if (deleteError) {
		throw new AppError({ message: "Error deleting quiz photo.", details: deleteError.message });
	}
}
