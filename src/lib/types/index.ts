import type { Database } from "./supabase-schema";

export type { Database as SupabaseSchema } from "./supabase-schema"
export type SupabaseTables = Database["public"]["Tables"];

export type StringForm = {
	[x: string]: string
}
export type FormError = {
	message: string
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

export enum SupabaseErrors {
	RECIPE_EXISTS = "A recipe with that name already exists",
	TAG_EXISTS = "A tag with that name already exists",
	INGREDIENT_EXISTS = "An ingredient with that name already exists",
	RECIPE_HAS_TAG = "That recipe already has that tag",
	RECIPE_HAS_INGREDIENT = "That recipe already has that ingredient"
}

export enum SupabaseSuccess {
	RECIPE_ADDED = "The recipe was added succesfully",
	TAG_ADDED = "The tag was added succesfully",
	INGREDIENT_ADDED = "The ingredient was added successfully",
	RECIPE_TAGS_ADDED = "The tags were successfully added to the recipe",
	RECIPE_INGREDIENTS_ADDED = "The ingredients were successfully added to the recipe",
	RECIPE_DELETED = "The recipe was deleted successfully",
	RECIPE_UPDATED = "The recipe was updated successfully"
}