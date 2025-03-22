import { supabase } from "../../config/supabase";

export default async function deleteUserFromAuth(id: string): Promise<void> {
	// Delete user from Supabase auth
	const { error } = await supabase.auth.admin.deleteUser(id);

	// Check if there was an error
	if (error != null) throw error;
}
