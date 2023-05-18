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

export namespace FormError {
	export enum Recipe {
		EXISTS = "A recipe with that name already exists",
		HAS_TAG = "That recipe already has that tag",
		HAS_INGREDIENT = "That recipe already has that ingredient"
	}
	export enum Tag {
		EXISTS = "A tag with that name already exists",
	}
	export enum Ingredient {
		EXISTS = "An ingredient with that name already exists",
	}
}

export namespace FormSuccess {
	export enum Recipe {
		ADDED = "The recipe was added succesfully",
		UPDATED = "The recipe was updated successfully",
		DELETED = "The recipe was deleted successfully",
		TAGS_ADDED = "The tags were successfully added to the recipe",
		INGREDIENTS_ADDED = "The ingredients were successfully added to the recipe",
		TAGS_UPDATED = "The recipe's tags were successfully updated",
		INGREDIENTS_UPDATED = "The recipe's ingredients were successfully updated",
	}
	export enum Tag {
		ADDED = "The tag was added succesfully",
	}
	export enum Ingredient {
		ADDED = "The ingredient was added successfully",
	}
}