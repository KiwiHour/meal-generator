import type { SupabaseSchema } from '$lib/types';
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import { PRIVATE_SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { Logger, Mailer, Profile } from '$lib/classes';
import { redirect, type RequestEvent } from '@sveltejs/kit';

const noLoginRoutes = ["/login", "/register", "/reset-password", "/reset-password-confirmation"]

function outputRequest(event: RequestEvent) {
	// To add extra space so it lines up with POST
	let method = event.request.method == "GET" ? "GET " : event.request.method
	let pathname = event.url.pathname

	console.log(`${method} ${pathname}`)
}

export async function handle({ event, resolve }) {

	outputRequest(event)

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