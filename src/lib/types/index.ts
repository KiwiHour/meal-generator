import type { Readable } from "svelte/store";
import type { Database } from "./supabase-schema"

export type { Database as SupabaseSchema } from "./supabase-schema"
export type SupabaseTables = Database["public"]["Tables"];

export interface RefreshableReadable<T> extends Readable<T> {
	refresh: () => Promise<void> | void
}

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

export namespace FormFailure {
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
		CREATED = "The recipe was successfully created",
		UPDATED = "The recipe was updated successfully",
		UPDATED_ALL = "The recipe, it's tags and ingredients were all updated successfully",
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