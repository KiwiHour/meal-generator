import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals }) => {

	let userId = (await locals.getSession())?.user.id
	let { error } = await locals.supabase.auth.signOut();
	if (error) throw error;

	await locals.logger.log("logout", userId)
	throw redirect(303, "/login")
};