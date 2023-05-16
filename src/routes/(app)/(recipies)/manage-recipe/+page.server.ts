import type { PageServerLoad, Actions } from './$types';
import type { StringForm } from '$lib/types';
import { Recipe } from '$lib/classes';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
	let id = url.searchParams.get("id")
	if (!id || isNaN(parseInt(id))) throw new Error(`Could not find recipe with id '${id}'`)

	let recipe = new Recipe(locals.supabase, parseInt(id))

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
		let { name, difficultyId, mealTypeId } = Object.fromEntries(formData) as StringForm
		let values = {
			name,
			difficulty_id: parseInt(difficultyId),
			meal_type_id: parseInt(mealTypeId)
		}

		let id = url.searchParams.get("id")
		if (!id) return fail(422, { error: { message: "Id not found" } })
		let recipe = new Recipe(locals.supabase, parseInt(id))
		let { success } = await recipe.update(values)

		return { success }

	}
};