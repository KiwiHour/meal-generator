import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { internalError } from "$lib/functions";

export const POST: RequestHandler = async ({ locals }) => {

	await locals.logger.log({ message: "logout" })

	let { error } = await locals.supabase.auth.signOut();

	if (error)
		throw internalError(error, "POST /logout")

	throw redirect(303, "/login")
};