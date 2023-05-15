import { FormErrors, type StringForm } from "$lib/types";
import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
	"add-recipe": async ({ locals, request }) => {
		let formData = await request.formData()
		let { name, difficultyId, mealTypeId } = Object.fromEntries(formData) as StringForm
		let values = {
			name,
			difficulty_id: parseInt(difficultyId),
			meal_type_id: parseInt(mealTypeId)
		}

		if (name.trim() == "") return fail(422, { error: { message: "Please enter a name" } })
		if (values.difficulty_id < 0) return fail(422, { error: { message: "Please select a difficulty" } })
		if (values.meal_type_id < 0) return fail(422, { error: { message: "Please select a meal type" } })

		let { message } = await locals.profile.addRecipe(values)
		if (message in FormErrors) return fail(422, { error: { message } })

		return { successMessage: message }
	}
};