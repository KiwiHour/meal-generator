export type { Database as SupabaseSchema } from "./supabase-schema"

export type StringForm = {
	[x: string]: string
}
export type FormError = {
	message: string
}
export type FormParams = {
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