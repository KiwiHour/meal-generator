import type { SupabaseErrors, StringForm } from "$lib/types";
import { Recipe } from "$lib/classes";
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

		// Ensure user entered all values
		if (name.trim() == "") return fail(422, { error: { message: "Please enter a name" } })
		if (values.difficulty_id < 0) return fail(422, { error: { message: "Please select a difficulty" } })
		if (values.meal_type_id < 0) return fail(422, { error: { message: "Please select a meal type" } })

		let { error: addRecipeError, id } = await locals.profile.addRecipe(values)
		if (addRecipeError) return fail(422, { error: addRecipeError })
		if (!id) throw new Error("Id not assigned correctly to new recipe")

		let recipe = new Recipe(locals.supabase, id)

		// Add selected tags to the new recipe
		let tagIds = formData.getAll("tagIds[]").map(tagId => parseInt(tagId as string))
		let { error: addTagsError } = await recipe.addTags(tagIds)
		if (addTagsError) return fail(422, { error: addTagsError })

		// Add selected ingredients to the new recipe
		let ingredientIds = formData.getAll("ingredientIds[]").map(ingredientId => parseInt(ingredientId as string))
		let { error: addIngredientsError } = await recipe.addIngredients(ingredientIds)
		if (addIngredientsError) return fail(422, { error: addIngredientsError })

		await locals.logger.log({
			message: "newrecipe",
			details: {
				recipe: { id: id.toString(), name }
			}
		})

		// Not using SupabaseSuccess here since this is a more generic message for
		// 'Recipe added AND the tags were added AND the ingredients were added'
		// All this extra behind-the-scenes stuff is expected by the user, so a generic success message is better
		return { success: { message: "Recipe added successfully" } }
	}
};