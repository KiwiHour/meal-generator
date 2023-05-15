import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { StringForm } from "$lib/types";

export const actions: Actions = {

	register: async ({ request, locals }) => {
		const formData = await request.formData();
		const { email, password, retypedPassword, forename } = Object.fromEntries(formData) as StringForm;

		if (password !== retypedPassword) return fail(401, { error: { message: "Passwords do not match" } })

		// Add user to authenticated supabase users
		const userMetadata = { forename }
		const { data: signUpData, error: signUpError } = await locals.supabase.auth.admin.generateLink({
			type: "signup",
			email, password,
			options: { data: userMetadata }
		})
		if (signUpError) return fail(500, { error: { message: signUpError.message } });

		await locals.mailer.sendConfirmationEmail(email, signUpData.properties.action_link)

		await locals.logger.log({ message: "register", details: { email } })
		return { success: true }

	}
};