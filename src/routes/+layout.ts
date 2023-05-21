import type { SupabaseSchema } from '$lib/types';
import type { LayoutLoad } from './$types';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import { Logger, Profile } from '$lib/classes';
import { internalError } from '$lib/functions';

export const load: LayoutLoad = async ({ fetch, data }) => {

	const supabase = createSupabaseLoadClient<SupabaseSchema>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const profile = new Profile(supabase)
	const logger = new Logger(supabase)
	const { data: { session }, error } = await supabase.auth.getSession();

	if (error)
		throw internalError(error, "+layout.ts load function")

	return { supabase, profile, session, logger };
};