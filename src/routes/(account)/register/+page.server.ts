import supabase from "$lib/clients/supabase";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import { Profile } from "$lib/classes";
import type { StringForm } from "$lib/types";

export const actions: Actions = {

	register: async ({ request, cookies }) => {
		const formData = await request.formData();
		const { email, password, retypedPassword, forename } = Object.fromEntries(formData) as StringForm;

		if (password !== retypedPassword) {
			return fail(401, { error_message: "Passwords do not match" })
		}
		// if (await profile.exists()) {
		// 	return fail(401, { error_message: "Email already in use" })
		// }

		// Add user to authenticated supabase users
		const userMetadata = { forename }
		const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
			{
				email, password,
				options: { data: userMetadata }
			})
		if (signUpError) return fail(500, { error_message: signUpError.message });

		return { success: true }

	}
};