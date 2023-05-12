import type { StringForm } from "$lib/types";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const actions: Actions = {
	"reset-password": async ({ request, url, locals }) => {
		const formData = await request.formData();
		const { email } = Object.fromEntries(formData) as StringForm;

		// const { data, error } = await locals.supabase.auth.resetPasswordForEmail(email, {
		// 	redirectTo: url.origin + "/update-password"
		// });

		const { data, error } = await locals.supabase.auth.admin.generateLink({
			type: "recovery",
			email,
			options: { redirectTo: url.origin + "/reset-password-confirmation" }
		})
		// const { data, error } = await locals.supabase.auth.resetPasswordForEmail(email, { redirectTo: "/update-password" })
		if (error) return fail(500, { error: { message: error.message } })

		await locals.mailer.sendResetPasswordEmail(email, data.properties.action_link)

		await locals.logger.log(`resetpassword (${email})`)
		return { success: true }
	}
};