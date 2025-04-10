import { quizDocumentsBucket } from "../../../assets/storageBucketNames";
// import { FileObject } from "@supabase/supabase-js";
import { supabase } from "../../../config/supabase";

export default async function getQuizDocuments(quizId: string) {
	// Get quiz documents
	const { data, error } = await supabase.storage.from(quizDocumentsBucket).list(quizId);

	// Check if there was an error
	if (error != null) throw error;

	// Check if data exists
	if (data == null) return [];

	// Return files
	return data;
}
