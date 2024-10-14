import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL;

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(
	SUPABASE_PROJECT_URL!,
	SUPABASE_ANON_KEY!
);