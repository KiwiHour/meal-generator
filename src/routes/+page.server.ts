import supabase from "$lib/clients/supabase";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	return {
		user: (await supabase.auth.getUser()).data.user
	}
};

export const actions: Actions = {
	login: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const { data, error } = await supabase.auth.signInWithPassword({ email, password })
		if (error) return fail(500, { error_message: error.message });

		return { success: true }
	},

	register: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const retypedPassword = formData.get("retyped-password") as string;

		if (password !== retypedPassword) {
			return fail(401, { error_message: "Passwords do not match" })
		}

		const { data, error } = await supabase.auth.signUp({ email, password })
		if (error) return fail(500, { error_message: error.message });

		return { success: true }

	}
};