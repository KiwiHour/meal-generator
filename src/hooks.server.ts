import type { SupabaseSchema } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import { Logger, Mailer, Profile } from '$lib/classes';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";

const noLoginRoutes = ["/login", "/register", "/reset-password", "/reset-password-confirmation"]

export async function handle({ event, resolve }) {

	console.log(event.request.method + " " + event.url.pathname)

	// Locals attachments
	event.locals.supabase = createSupabaseServerClient<SupabaseSchema>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PRIVATE_SUPABASE_SERVICE_ROLE_KEY,
		event
	});
	event.locals.getSession = async () => {
		const { data: { session } } = await event.locals.supabase.auth.getSession();
		return session;
	};

	event.locals.profile = new Profile(event.locals.supabase)
	event.locals.logger = new Logger(event.locals.supabase, event.locals.getSession)
	event.locals.mailer = new Mailer()

	// Authentication
	if (noLoginRoutes.includes(event.url.pathname))
		return await resolve(event);

	// Check if logged in
	if (!await event.locals.getSession())
		throw redirect(303, "/login")

	return await resolve(event);
}