import type { StringForm } from "$lib/types";
import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const { email, password } = Object.fromEntries(formData) as StringForm;

		const { data, error } = await locals.supabase.auth.signInWithPassword({ email, password })
		if (error) return fail(500, { error: { message: error.message } });
		if (!data.session) return fail(500, { error: { message: "could not connect to supabase correctly" } })

		await locals.logger.log("login")
		throw redirect(303, "/")
	}
};