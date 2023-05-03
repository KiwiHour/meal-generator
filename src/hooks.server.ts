import supabase from '$lib/clients/supabase';

export async function handle({ event, resolve }) {

	const { data: { user } } = await supabase.auth.getUser()
	console.log(user?.email)

	return await resolve(event);
}