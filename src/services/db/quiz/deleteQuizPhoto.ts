import { quizPhotosBucket } from "../../../assets/storageBucketNames";
import { supabase } from "../../../config/supabase";

export default async function deleteQuizPhoto(quizId: string): Promise<void> {
	// Get quiz photo
	const { data, error: listError } = await supabase.storage.from(quizPhotosBucket).list(quizId, {
		limit: 1,
	});

	// Check if there was an error
	if (listError != null) throw listError;

	// Check if data exists
	if (data == null || data.length === 0) return;

	// Get quiz photo
	const file = data[0];

	// Check if quiz photo exists
	if (file == undefined) return;

	// Delete file
	const { error: removeError } = await supabase.storage
		.from(quizPhotosBucket)
		.remove([`${quizId}/${file.name}`]);

	// Check if there was an error
	if (removeError != null) throw removeError;
}
