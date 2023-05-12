import type { SupabaseSchema } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import { Profile } from '$lib/classes';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";

const noLoginRoutes = ["/login", "/register", "/reset-password"]

export async function handle({ event, resolve }) {

	console.log(event.request.method + " " + event.url.pathname)

	// Supabase setup
	event.locals.supabase = createSupabaseServerClient<SupabaseSchema>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});
	event.locals.getSession = async () => {
		const { data: { session } } = await event.locals.supabase.auth.getSession();
		return session;
	};
	event.locals.getUser = async () => {
		const { data: { user } } = await event.locals.supabase.auth.getUser();
		return user;
	}
	event.locals.profile = new Profile(event.locals.supabase)

	if (noLoginRoutes.includes(event.url.pathname))
		return await resolve(event);

	// Check if logged in
	if (!await event.locals.getUser())
		throw redirect(303, "/login");

	return await resolve(event);
}