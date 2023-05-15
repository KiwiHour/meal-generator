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

export enum FormErrors {
	RECIPE_EXISTS = "A recipe with that name already exists",
	TAG_EXISTS = "A tag with that name already exists"
}