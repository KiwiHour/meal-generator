import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals }) => {

	let { error } = await locals.supabase.auth.signOut();
	if (error) throw error;

	throw redirect(303, "/login")
};