import type { PageServerLoad } from "./$types";
import { fail, type Actions } from "@sveltejs/kit";
import { extractRecipeFormData, internalError } from "$lib/functions";
import { Recipe } from "$lib/classes";


export const load: PageServerLoad = async ({ locals }) => {
	return {
		recipes: await locals.profile.getRecipes(),
		difficulties: await locals.profile.getDifficulties(),
		mealTypes: await locals.profile.getMealTypes()
	}
};

export const actions: Actions = {
	"add-recipe": async ({ locals, request }) => {
		let formData = await request.formData()
		let { name, difficultyId, mealTypeId, tagIds, ingredientIds } = extractRecipeFormData(formData)
		let values = {
			difficulty_id: difficultyId,
			meal_type_id: mealTypeId,
			name,
		}

		// Ensure user entered all values
		if (name.trim() == "") return fail(422, { error: { message: "Please enter a name" } })
		if (values.difficulty_id < 0) return fail(422, { error: { message: "Please select a difficulty" } })
		if (values.meal_type_id < 0) return fail(422, { error: { message: "Please select a meal type" } })

		let { error: addRecipeError, id } = await locals.profile.addRecipe(values)
		if (addRecipeError) return fail(422, { error: addRecipeError })
		if (!id)
			throw internalError("Id not assigned correctly to new recipe", "POST /add-recipe")

		let recipe = new Recipe(locals.supabase, id)

		// Add selected tags to the new recipe
		let { error: addTagsError } = await recipe.addTags(tagIds)
		if (addTagsError) return fail(422, { error: addTagsError })

		// Add selected ingredients to the new recipe
		let { error: addIngredientsError } = await recipe.addIngredients(ingredientIds)
		if (addIngredientsError) return fail(422, { error: addIngredientsError })

		await locals.logger.log({
			message: "newrecipe",
			details: {
				recipeId: id.toString()
			}
		})

		// Not using FormSuccess here since this is a more generic message for
		// 'Recipe added AND the tags were added AND the ingredients were added'
		// All this extra behind-the-scenes stuff is expected by the user, so a generic success message is better
		return { success: { message: "Recipe added successfully" } }
	}
};