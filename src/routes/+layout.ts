import type { SupabaseSchema } from '$lib/types';
import type { LayoutLoad } from './$types';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
// Import specific file, rather than from index.ts
// because index.ts also exports Mailer.ts, which uses a private (server-side) env variable
import Profile from '$lib/classes/Profile';

export const load: LayoutLoad = async ({ fetch, data }) => {

	const supabase = createSupabaseLoadClient<SupabaseSchema>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const { data: { session } } = await supabase.auth.getSession();
	const profile = new Profile(supabase)

	return { supabase, session, profile };
};