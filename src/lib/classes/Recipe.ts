import { SupabaseErrors, SupabaseSuccess, type SupabaseSchema, type SupabaseTables } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export default class Profile {

	constructor(private supabase: SupabaseClient<SupabaseSchema>, public id: number) { }

	// -- Getters --

	private async getIngredientIds() {
		let { data: recipies, error } = await this.supabase.from("xref_recipe_ingredients").select("ingredient_id").eq("recipe_id", this.id);
		if (error) throw error;

		// Default to empty array if none are found
		recipies = recipies ?? []

		// Map into array of ingredient ids
		return recipies.map(recipe => recipe.ingredient_id)
	}
	private async getTagIds() {
		let { data: recipies, error } = await this.supabase.from("xref_recipe_tags").select("tag_id").eq("recipe_id", this.id);
		if (error) throw error;

		// Default to empty array if none are found
		recipies = recipies ?? []

		// Map into array of ingredient ids
		return recipies.map(recipe => recipe.tag_id)
	}

	public async getIngredients() {
		let ingredientIds = await this.getIngredientIds()
		let { data: ingredients, error } = await this.supabase.from("recipe_ingredients").select("*").in("id", ingredientIds)
		if (error) throw error;

		return ingredients ?? [];
	}
	public async getTags() {
		let tagIds = await this.getTagIds()
		let { data: tags, error } = await this.supabase.from("recipe_tags").select("*").in("id", tagIds)
		if (error) throw error;

		return tags ?? [];
	}


	// -- Setters --

	public async addIngredients(ingredientIds: number[]) {
		let currentIngredientIds = await this.getIngredientIds()
		let alreadyHasIngredient = currentIngredientIds.some(ingredientId => ingredientIds.includes(ingredientId))
		if (alreadyHasIngredient)
			return { error: { message: SupabaseErrors.RECIPE_HAS_INGREDIENT } }

		let values = ingredientIds.map(ingredientId => ({
			recipe_id: this.id,
			ingredient_id: ingredientId
		}))

		let { error } = await this.supabase.from("xref_recipe_ingredients").insert(values)
		if (error) throw error

		return { success: { message: SupabaseSuccess.RECIPE_INGREDIENTS_ADDED } }
	}
	public async addTags(tagIds: number[]) {
		let currentTagIds = await this.getTagIds()
		let alreadyHasTag = currentTagIds.some(tagId => tagIds.includes(tagId))
		if (alreadyHasTag)
			return { error: { message: SupabaseErrors.RECIPE_HAS_TAG } };

		let values = tagIds.map(tagId => ({
			recipe_id: this.id,
			tag_id: tagId
		}))

		let { error } = await this.supabase.from("xref_recipe_tags").insert(values)
		if (error) throw error;

		return { success: { message: SupabaseSuccess.RECIPE_TAGS_ADDED } }

	}

}