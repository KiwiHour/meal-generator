import { redirect } from '@sveltejs/kit';
import { Profile } from '$lib/classes';
import supabase from '$lib/clients/supabase';

const noJWTPaths = ["/login", "/register"]

export async function handle({ event, resolve }) {

	if (event.url.pathname == "/") throw redirect(303, "/homepage")

	// Do stuff that doesn't need JWT
	if (noJWTPaths.includes(event.url.pathname)) return await resolve(event);

	// Check if user has a jwt
	const jwt = event.cookies.get("jwt");
	if (!jwt) throw redirect(303, "/login")

	// Check if jwt is valid
	const { data: { user } } = await supabase.auth.getUser(jwt)
	if (!user) throw redirect(303, "/login")

	const profile = new Profile(user.id as string);

	// Attach to locals
	event.locals.profile = profile

	return await resolve(event);
}