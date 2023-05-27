import { FormFailure, FormSuccess, type SupabaseSchema, type SupabaseTables } from "$lib/types";
import { getMethodLocation, internalError } from "$lib/functions";
import type { SupabaseClient } from "@supabase/supabase-js";
import type Logger from "./Logger";
import { fail } from "@sveltejs/kit";
import { selectedIngredientIds } from "$stores";

export default class Recipe {

	constructor(private supabase: SupabaseClient<SupabaseSchema>, private logger: Logger, public id: number) { }

	// -- Getters --

	private async getDetails() {
		let { data, error } = await this.supabase.from("recipes").select("*").eq("id", this.id).single();

		if (error)
			throw internalError(error, getMethodLocation(this, this.getDetails))
		if (!data)
			throw internalError("Could not retrieve recipe details successfully", getMethodLocation(this, this.getDetails))

		return data;
	}

	private async getIngredientIds() {
		let { data: recipes, error } = await this.supabase.from("xref_recipe_ingredients").select("ingredient_id").eq("recipe_id", this.id);

		if (error)
			throw internalError(error, getMethodLocation(this, this.getIngredientIds))

		// Default to empty array if none are found
		recipes = recipes ?? []

		// Map into array of ingredient ids
		return recipes.map(recipe => recipe.ingredient_id)
	}
	private async getTagIds() {
		let { data: recipes, error } = await this.supabase.from("xref_recipe_tags").select("tag_id").eq("recipe_id", this.id);

		if (error)
			throw internalError(error, getMethodLocation(this, this.getTagIds))

		// Default to empty array if none are found
		recipes = recipes ?? []

		// Map into array of ingredient ids
		return recipes.map(recipe => recipe.tag_id)
	}

	public async getName() {
		let details = await this.getDetails()
		return details.name
	}
	public async getDifficulty() {
		let details = await this.getDetails()
		let { data: difficulty, error } = await this.supabase.from("recipe_difficulties").select("*").eq("id", details.difficulty_id).single()

		if (error)
			throw internalError(error, getMethodLocation(this, this.getDifficulty))
		if (!difficulty)
			throw internalError("Could not retrieve recipe's difficulty", getMethodLocation(this, this.getDifficulty))

		return difficulty
	}
	public async getMealType() {
		let details = await this.getDetails()
		let { data: mealType, error } = await this.supabase.from("recipe_meal_types").select("*").eq("id", details.meal_type_id).single()

		if (error)
			throw internalError(error, getMethodLocation(this, this.getMealType))
		if (!mealType)
			throw internalError("Could not retrieve recipe's meal type", getMethodLocation(this, this.getMealType))

		return mealType
	}
	public async getIngredients() {
		let ingredientIds = await this.getIngredientIds()
		let { data: ingredients, error } = await this.supabase.from("recipe_ingredients").select("*").in("id", ingredientIds)

		if (error)
			throw internalError(error, getMethodLocation(this, this.getIngredients))

		return ingredients ?? [];
	}
	public async getTags() {
		let tagIds = await this.getTagIds()
		let { data: tags, error } = await this.supabase.from("recipe_tags").select("*").in("id", tagIds)

		if (error)
			throw internalError(error, getMethodLocation(this, this.getTags))

		return tags ?? [];
	}

	// -- Adders --

	/** Add a new recipe to the database */
	public async create(tagIds: number[], ingredientIds: number[]) {
		let { failure: addTagsFailure } = await this.addTags(tagIds)
		if (addTagsFailure)
			return { failure: addTagsFailure }

		let { failure: addIngredientsFailure } = await this.addIngredients(ingredientIds)
		if (addIngredientsFailure)
			return { failure: addIngredientsFailure }

		await this.logger.log({
			message: "newrecipe",
			details: {
				recipeId: this.id
			}
		})

		return { success: { message: FormSuccess.Recipe.CREATED } }

	}
	public async addTags(tagIds: number[]) {
		let currentTagIds = await this.getTagIds()
		let alreadyHasTag = currentTagIds.some(tagId => tagIds.includes(tagId))
		if (alreadyHasTag)
			return { failure: { message: FormFailure.Recipe.HAS_TAG } };

		let values = tagIds.map(tagId => ({
			recipe_id: this.id,
			tag_id: tagId
		}))

		let { error } = await this.supabase.from("xref_recipe_tags").insert(values)

		if (error)
			throw internalError(error, getMethodLocation(this, this.addTags))

		return { success: { message: FormSuccess.Recipe.TAGS_ADDED } }

	}
	public async addIngredients(ingredientIds: number[]) {
		let currentIngredientIds = await this.getIngredientIds()
		let alreadyHasIngredient = currentIngredientIds.some(ingredientId => ingredientIds.includes(ingredientId))
		if (alreadyHasIngredient)
			return { failure: { message: FormFailure.Recipe.HAS_INGREDIENT } }

		let values = ingredientIds.map(ingredientId => ({
			recipe_id: this.id,
			ingredient_id: ingredientId
		}))

		let { error } = await this.supabase.from("xref_recipe_ingredients").insert(values)

		if (error)
			throw internalError(error, getMethodLocation(this, this.addIngredients))

		return { success: { message: FormSuccess.Recipe.INGREDIENTS_ADDED } }
	}

	// -- Updaters --

	public async updateAll(values: SupabaseTables["recipes"]["Update"], tagIds: number[], ingredientIds: number[]) {
		await this.update(values)

		let { failure: updateTagsFailure } = await this.updateTags(tagIds)
		if (updateTagsFailure)
			return { failure: updateTagsFailure }

		let { failure: updateIngredientsFailure } = await this.updateIngredients(ingredientIds)
		if (updateIngredientsFailure)
			return { failure: updateIngredientsFailure }

		await this.logger.log({
			message: "updaterecipe",
			details: {
				recipeId: this.id
			}
		})

		return { success: { message: FormSuccess.Recipe.UPDATED_ALL } }
	}
	public async update(values: SupabaseTables["recipes"]["Update"]) {
		let { error } = await this.supabase.from("recipes").update(values).eq("id", this.id)

		if (error)
			throw internalError(error, getMethodLocation(this, this.update))

		return { success: { message: FormSuccess.Recipe.UPDATED } }
	}
	public async updateTags(tagIds: number[]) {
		let { error: deleteTagsError } = await this.supabase.from("xref_recipe_tags").delete().eq("recipe_id", this.id)
		if (deleteTagsError)
			throw internalError(deleteTagsError, getMethodLocation(this, this.updateTags));

		let { failure: addTagsFailure } = await this.addTags(tagIds)
		if (addTagsFailure)
			return { failure: addTagsFailure }

		return { success: { message: FormSuccess.Recipe.TAGS_UPDATED } }
	}
	public async updateIngredients(ingredientIds: number[]) {
		let { error: deleteIngredientsError } = await this.supabase.from("xref_recipe_ingredients").delete().eq("recipe_id", this.id)
		if (deleteIngredientsError)
			throw internalError(deleteIngredientsError, getMethodLocation(this, this.updateIngredients));

		let { failure: addIngredientsFailure } = await this.addIngredients(ingredientIds)
		if (addIngredientsFailure)
			return { failure: addIngredientsFailure }

		return { success: { message: FormSuccess.Recipe.INGREDIENTS_UPDATED } }
	}

	// -- Deleters --

	public async delete() {
		let { error } = await this.supabase.from("recipes").delete().eq("id", this.id)

		if (error)
			throw internalError(error, getMethodLocation(this, this.delete))

		return { success: { message: FormSuccess.Recipe.DELETED } }
	}

	// -- Validators --

	public async doesExist() {
		let { data, error } = await this.supabase.from("recipes").select("*").eq("id", this.id).single();
		if (error || !data) return false;
		else return true;
	}

}