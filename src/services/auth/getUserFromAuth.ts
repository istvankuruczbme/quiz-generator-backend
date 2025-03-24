import { User } from "@supabase/supabase-js";
import { supabase } from "../../config/supabase";

export default async function getUserFromAuth(token: string): Promise<User> {
	// Get user
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser(token);

	// Check error
	if (error != null) throw error;

	// Check user
	if (user == null) throw new Error("auth/invalid-token");

	// Return user
	return user;
}
