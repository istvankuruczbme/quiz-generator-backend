import { questionPhotosBucket } from "../../../assets/storageBucketNames";
import { supabase } from "../../../config/supabase";

export default async function deleteQuestionPhoto(questionId: string): Promise<void> {
	// Get question photo
	const { data, error: listError } = await supabase.storage
		.from(questionPhotosBucket)
		.list(questionId, {
			limit: 1,
		});

	// Check if there was an error
	if (listError != null) throw listError;

	// Check if question photo exists
	if (data == null || data.length === 0) return;

	// Get question photo
	const file = data[0];

	// Check if question photo exists
	if (file == undefined) return;

	// Delete file
	const { error: removeError } = await supabase.storage
		.from(questionPhotosBucket)
		.remove([`${questionId}/${file.name}`]);

	// Check if there was an error
	if (removeError != null) throw removeError;
}
