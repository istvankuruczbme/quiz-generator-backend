import { User } from "@supabase/supabase-js";
import { supabase } from "../../config/supabase";

export default async function getUserFromAuth(token: string): Promise<User | null> {
	// Get user
	const { data, error } = await supabase.auth.getUser(token);

	// Check error
	if (error != null) throw error;

	// Return user
	return data.user;
}
