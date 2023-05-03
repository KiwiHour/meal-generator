import type { SupabaseSchema } from "$lib/types";
import { SUPABASE_SERVICE_KEY, SUPABASE_URL } from "$env/static/private";
import { createClient } from "@supabase/supabase-js";

export default createClient<SupabaseSchema>(SUPABASE_URL, SUPABASE_SERVICE_KEY, { auth: { persistSession: false } })
