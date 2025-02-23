import { createClient } from "@supabase/supabase-js";

// Create instance of Supabase
export const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);
