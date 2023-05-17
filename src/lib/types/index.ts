import type { Database } from "./supabase-schema";

export type { Database as SupabaseSchema } from "./supabase-schema"
export type SupabaseTables = Database["public"]["Tables"];

export type StringForm = {
	[x: string]: string
}
export type FormProps = {
	action: string,
	method: "GET" | "POST" | "get" | "post",
	submitText: string,
	fields: {
		type: "text" | "password" | "email",
		name: string,
		id?: string,
		placeholder?: string
	}[]
}

export enum FormError {
	RECIPE_EXISTS = "A recipe with that name already exists",
	TAG_EXISTS = "A tag with that name already exists",
	INGREDIENT_EXISTS = "An ingredient with that name already exists",
	RECIPE_HAS_TAG = "That recipe already has that tag",
	RECIPE_HAS_INGREDIENT = "That recipe already has that ingredient"
}

export enum FormSuccess {
	RECIPE_ADDED = "The recipe was added succesfully",
	TAG_ADDED = "The tag was added succesfully",
	INGREDIENT_ADDED = "The ingredient was added successfully",
	RECIPE_TAGS_ADDED = "The tags were successfully added to the recipe",
	RECIPE_INGREDIENTS_ADDED = "The ingredients were successfully added to the recipe",
	RECIPE_DELETED = "The recipe was deleted successfully",
	RECIPE_UPDATED = "The recipe was updated successfully",
	RECIPE_INGREDIENTS_UPDATED = "The recipie's ingredients were successfully updated",
	RECIPE_TAGS_UPDATED = "The recipie's tags were successfully updated",
}