import { User } from "@supabase/supabase-js";
import { supabase } from "../../config/supabase";
import AppError from "../../classes/AppError";

export default async function getUserFromAuth(token: string): Promise<User> {
	// Get user
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser(token);

	// Check error
	if (error != null) throw new AppError({ message: "Error getting authenticated user." });

	// Check user
	if (user == null) throw new AppError({ message: "User not found.", status: 404 });

	// Return user
	return user;
}
