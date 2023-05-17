import type { PageServerLoad, Actions } from './$types';
import { FormSuccess, type StringForm } from '$lib/types';
import { Recipe } from '$lib/classes';
import { error, fail } from '@sveltejs/kit';
import { extractRecipeFormData } from '$lib/functions';

export const load: PageServerLoad = async ({ locals, url }) => {
	let id = url.searchParams.get("id")
	if (!id || isNaN(parseInt(id)))
		throw error(422, `query parameter 'id' not set`)

	let recipe = new Recipe(locals.supabase, parseInt(id))
	if (!await recipe.doesExist())
		throw error(422, `Could not find recipe with id '${id}'`);

	return {
		recipe: {
			id: parseInt(id),
			name: await recipe.getName(),
			difficulty: await recipe.getDifficulty(),
			mealType: await recipe.getMealType(),
			tags: await recipe.getTags(),
			ingredients: await recipe.getIngredients()
		},
		difficulties: await locals.profile.getDifficulties(),
		mealTypes: await locals.profile.getMealTypes()
	}

};

export const actions: Actions = {
	"update-recipe": async ({ locals, request, url }) => {
		let formData = await request.formData()
		let { name, difficultyId, mealTypeId, tagIds, ingredientIds } = extractRecipeFormData(formData)
		let values = {
			difficulty_id: difficultyId,
			meal_type_id: mealTypeId,
			name,
		}

		let id = url.searchParams.get("id")
		if (!id) return fail(422, { error: { message: "Id not found" } })

		let recipe = new Recipe(locals.supabase, parseInt(id))
		await recipe.update(values)
		await recipe.updateTags(tagIds)
		await recipe.updateIngredients(ingredientIds)

		await locals.logger.log({
			message: "updaterecipe",
			details: {
				recipeId: id.toString()
			}
		})

		return { success: { message: FormSuccess.RECIPE_UPDATED } }

	}
};