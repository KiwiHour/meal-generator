import { type SupabaseTables, type SupabaseSchema, SupabaseErrors, SupabaseSuccess } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";

function sortAlphabeticallyByProperty<T>(arr: any[], property: string) {
	return arr.sort((a, b) => a[property].toLowerCase() > b[property].toLowerCase() ? 1 : a[property].toLowerCase() < b[property].toLowerCase() ? -1 : 0) as T[]
}

export default class Profile {

	constructor(private supabase: SupabaseClient<SupabaseSchema>) { }

	// -- Getters --

	// Profile details
	private async getDetails() {
		let { data, error } = await this.supabase.from("profiles").select("*").single();
		if (error) throw error
		if (!data) throw new Error("Could not retrieve profile details")
		return data;
	}
	public async getLogs() {
		// USERS HAVE THE RIGHT TO SEE THEIR OWN LOGS, DAMNIT!
		let { data: logs, error } = await this.supabase.from("logs").select("*");
		if (error) throw error

		return logs ?? [];
	}
	public async getDifficulties() {
		let { data: difficulties, error } = await this.supabase.from("recipe_difficulties").select("*");
		if (error) throw error

		// Sort by easiest first
		return (difficulties ?? []).sort((a, b) => a.value - b.value);
	}
	public async getMealTypes() {
		let { data: mealTypes, error } = await this.supabase.from("recipe_meal_types").select("*");
		if (error) throw error

		return sortAlphabeticallyByProperty<SupabaseTables["recipe_meal_types"]["Row"]>(mealTypes ?? [], "name");
	}
	public async getForename() {
		let details = await this.getDetails();
		return details.forename
	}
	public async isNew() {
		let details = await this.getDetails();
		return details.is_new_profile ?? false // defaults to false if undefined
	}

	// Recipe details
	public async getRecipies() {
		let { data: recipies, error } = await this.supabase.from("recipies").select("*");
		if (error) throw error;

		return sortAlphabeticallyByProperty<SupabaseTables["recipies"]["Row"]>(recipies ?? [], "name");
	}
	public async getIngredients() {
		let { data: ingredients, error } = await this.supabase.from("recipe_ingredients").select("*");
		if (error) throw error;

		return sortAlphabeticallyByProperty<SupabaseTables["recipe_ingredients"]["Row"]>(ingredients ?? [], "name");
	}
	public async getTags() {
		let { data: tags, error } = await this.supabase.from("recipe_tags").select("*");
		if (error) throw error;

		return sortAlphabeticallyByProperty<SupabaseTables["recipe_tags"]["Row"]>(tags ?? [], "name");
	}

	// -- Adders --

	// Recipe details
	public async addRecipe(values: Omit<SupabaseTables["recipies"]["Insert"], "user_id">) {
		if (await this.doesRecipeNameExist(values.name))
			return { error: { message: SupabaseErrors.RECIPE_EXISTS } };

		let details = await this.getDetails();
		let { data, error } = await this.supabase.from("recipies").insert({ ...values, user_id: details.id }).select().single()
		if (error) throw error;
		if (!data) throw new Error("Could not retrieve newly added recipe")

		return { success: { message: SupabaseSuccess.RECIPE_ADDED }, id: data.id }
	}
	public async addTag(values: Omit<SupabaseTables["recipe_tags"]["Insert"], "user_id">) {
		if (await this.doesTagExist(values.name))
			return { error: { message: SupabaseErrors.TAG_EXISTS } };

		let details = await this.getDetails();
		let { data, error } = await this.supabase.from("recipe_tags").insert({ ...values, user_id: details.id }).select().single()
		if (error) throw error;
		if (!data) throw new Error("Could not retrieve newly added tag")

		return { success: { message: SupabaseSuccess.TAG_ADDED }, id: data.id }
	}
	public async addIngredient(values: Omit<SupabaseTables["recipe_ingredients"]["Insert"], "user_id">) {
		if (await this.doesIngredientExist(values.name))
			return { error: { message: SupabaseErrors.INGREDIENT_EXISTS } };

		let details = await this.getDetails();
		let { data, error } = await this.supabase.from("recipe_ingredients").insert({ ...values, user_id: details.id }).select().single()
		if (error) throw error;
		if (!data) throw new Error("Could not retrieve newly added ingredient")

		return { success: { message: SupabaseSuccess.INGREDIENT_ADDED }, id: data.id }
	}

	// -- Validators --

	// Recipe details
	public async doesRecipeNameExist(name: string) {
		let recipies = await this.getRecipies()
		// Convert to names, lowercase and remove spaces to match easier
		let recipeNames = recipies.map(recipe => recipe.name.toLowerCase().replace(/\s+/g, ""))

		return recipeNames.includes(name.toLowerCase().replace(/\s+/g, ""))
	}
	public async doesTagExist(name: string) {
		let tags = await this.getTags()
		// Convert to names, lowercase and remove spaces to match easier
		let tagNames = tags.map(tag => tag.name.toLowerCase().replace(/\s+/g, ""))

		return tagNames.includes(name.toLowerCase().replace(/\s+/g, ""))
	}
	public async doesIngredientExist(name: string) {
		let ingredients = await this.getIngredients()
		// Convert to names, lowercase and remove spaces to match easier
		let ingredientNames = ingredients.map(ingredient => ingredient.name.toLowerCase().replace(/\s+/g, ""))

		return ingredientNames.includes(name.toLowerCase().replace(/\s+/g, ""))
	}


}