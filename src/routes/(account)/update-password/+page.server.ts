import type { StringForm } from "$lib/types";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const actions: Actions = {
	"update-password": async ({ request, locals }) => {
		const formData = await request.formData();
		const { newPassword, newRetypedPassword } = Object.fromEntries(formData) as StringForm;

		if (newPassword !== newRetypedPassword) return fail(401, { error: { message: "Passwords do not match" } })
		const { data, error } = await locals.supabase.auth.updateUser({ password: newPassword })
		if (error) return fail(500, { error: { message: error.message } })

		// Password changed, so user must sign in again
		await locals.supabase.auth.signOut();

		await locals.logger.log(`updatepassword`)
		return { success: true }

	}
};