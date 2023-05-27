import { type SupabaseTables, type SupabaseSchema, FormFailure, FormSuccess } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import type Logger from "./Logger";
import { getMethodLocation, internalError, sortAlphabeticallyByKey } from "$lib/functions";

/**
 * Converts to lowercase and removes all spaces
 * Optimal for checking if two strings are similar for searches and like
 */
function toLowerCaseNoSpaces(str: string) {
	return str.toLowerCase().replace(/\s+/g, "")
}

export default class Profile {

	constructor(private supabase: SupabaseClient<SupabaseSchema>, private logger: Logger) { }

	// -- Getters --

	// Profile details
	private async getDetails() {
		let { data, error } = await this.supabase.from("profiles").select("*").single();

		if (error)
			throw internalError(error, getMethodLocation(this, this.getDetails))
		if (!data)
			throw internalError("Could not retrieve profile details", getMethodLocation(this, this.getDetails))

		return data;
	}
	public async getLogs() {
		// USERS HAVE THE RIGHT TO SEE THEIR OWN LOGS, DAMNIT!
		let { data: logs, error } = await this.supabase.from("logs").select("*");

		if (error)
			throw internalError(error, getMethodLocation(this, this.getLogs))

		return logs ?? [];
	}
	public async getDifficulties() {
		let { data: difficulties, error } = await this.supabase.from("recipe_difficulties").select("*");

		if (error)
			throw internalError(error, getMethodLocation(this, this.getDifficulties))

		// Sort by easiest first
		return (difficulties ?? []).sort((a, b) => a.value - b.value);
	}
	public async getMealTypes() {
		let { data: mealTypes, error } = await this.supabase.from("recipe_meal_types").select("*");

		if (error || !mealTypes)
			throw internalError(error || "Failed to select from table", getMethodLocation(this, this.getMealTypes))

		return sortAlphabeticallyByKey(mealTypes, "name");
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
	public async getRecipes() {
		let { data: recipes, error } = await this.supabase.from("recipes").select("*");

		if (error || !recipes)
			throw internalError(error || "Failed to select from table", getMethodLocation(this, this.getRecipes))

		return sortAlphabeticallyByKey(recipes, "name");
	}
	public async searchRecipes(qname?: string | null) {
		// Would do with an ILIKE, but REPLACE isn't possible in supabase client
		let recipes = await this.getRecipes()
		if (qname)
			recipes = recipes?.filter(recipe => toLowerCaseNoSpaces(recipe.name).includes(toLowerCaseNoSpaces(qname)))

		return sortAlphabeticallyByKey(recipes, "name");
	}
	public async getIngredients() {
		let { data: ingredients, error } = await this.supabase.from("recipe_ingredients").select("*");

		if (error || !ingredients)
			throw internalError(error || "Failed to select from table", getMethodLocation(this, this.getIngredients))

		return sortAlphabeticallyByKey(ingredients, "name");
	}
	public async getTags() {
		let { data: tags, error } = await this.supabase.from("recipe_tags").select("*");

		if (error || !tags)
			throw internalError(error || "Failed to select from table", getMethodLocation(this, this.getTags))

		return sortAlphabeticallyByKey(tags, "name");
	}

	// -- Adders --

	// Recipe details
	public async addRecipe(values: Omit<SupabaseTables["recipes"]["Insert"], "user_id">) {
		if (await this.doesRecipeNameExist(values.name))
			return { failure: { message: FormFailure.Recipe.EXISTS } };

		let details = await this.getDetails();
		let { data, error } = await this.supabase.from("recipes").insert({ ...values, user_id: details.id }).select().single()

		if (error)
			throw internalError(error, getMethodLocation(this, this.addRecipe))
		if (!data)
			throw internalError("Could not retrieve newly added recipe", getMethodLocation(this, this.addRecipe))

		return { id: data.id }
	}
	public async addTag(values: Omit<SupabaseTables["recipe_tags"]["Insert"], "user_id">) {
		if (await this.doesTagExist(values.name))
			return { failure: { message: FormFailure.Tag.EXISTS } };

		let details = await this.getDetails();
		let { data: tag, error } = await this.supabase.from("recipe_tags").insert({ ...values, user_id: details.id }).select().single()

		if (error)
			throw internalError(error, getMethodLocation(this, this.addTag))
		if (!tag)
			throw internalError("Could not retrieve newly added tag", getMethodLocation(this, this.addTag))

		await this.logger.log({
			message: "newtag",
			details: {
				tagId: tag.id
			}
		})

		return { success: { message: FormSuccess.Tag.ADDED }, id: tag.id }
	}
	public async addIngredient(values: Omit<SupabaseTables["recipe_ingredients"]["Insert"], "user_id">) {
		if (await this.doesIngredientExist(values.name))
			return { failure: { message: FormFailure.Ingredient.EXISTS } };

		let details = await this.getDetails();
		let { data: ingredient, error } = await this.supabase.from("recipe_ingredients").insert({ ...values, user_id: details.id }).select().single()

		if (error)
			throw internalError(error, getMethodLocation(this, this.addIngredient))
		if (!ingredient)
			throw internalError("Could not retrieve newly added ingredient", getMethodLocation(this, this.addIngredient))

		await this.logger.log({
			message: "newingredient",
			details: {
				ingredientId: ingredient.id
			}
		})

		return { success: { message: FormSuccess.Ingredient.ADDED }, id: ingredient.id }
	}

	// -- Validators --

	// Recipe details
	public async doesRecipeNameExist(name: string) {
		let recipes = await this.getRecipes()
		// Convert to names, lowercase and remove spaces to match easier
		let recipeNames = recipes.map(recipe => toLowerCaseNoSpaces(recipe.name))

		return recipeNames.includes(toLowerCaseNoSpaces(name))
	}
	public async doesTagExist(name: string) {
		let tags = await this.getTags()
		// Convert to names, lowercase and remove spaces to match easier
		let tagNames = tags.map(tag => toLowerCaseNoSpaces(tag.name))

		return tagNames.includes(toLowerCaseNoSpaces(name))
	}
	public async doesIngredientExist(name: string) {
		let ingredients = await this.getIngredients()
		// Convert to names, lowercase and remove spaces to match easier
		let ingredientNames = ingredients.map(ingredient => toLowerCaseNoSpaces(ingredient.name))

		return ingredientNames.includes(toLowerCaseNoSpaces(name))
	}


}