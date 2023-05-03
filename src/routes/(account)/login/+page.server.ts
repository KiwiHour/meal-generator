import type { StringForm } from "$lib/types";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import supabase from "$lib/clients/supabase";

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const formData = await request.formData();
		const { email, password } = Object.fromEntries(formData) as StringForm;

		const { data, error } = await supabase.auth.signInWithPassword({ email, password })
		if (error) return fail(500, { error_message: error.message });
		if (!data.session) return fail(500, { error_message: "could not connect to supabase correctly" })

		cookies.set("jwt", data.session.access_token);

		throw redirect(303, "/homepage")
	}
};