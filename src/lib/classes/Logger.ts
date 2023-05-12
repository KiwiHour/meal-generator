import type { SupabaseSchema } from "$lib/types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

export default class Logger {

	constructor(private supabase: SupabaseClient<SupabaseSchema>, private getSession: () => Promise<Session | null>) { }

	async log(message: string, userId?: string) {
		let { data, error } = await this.supabase.from("logs").insert({
			user_id: (await this.getSession())?.user.id ?? userId,
			message
		})
		if (error) throw error
	}
}