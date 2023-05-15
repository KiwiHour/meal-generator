import type { SupabaseSchema } from "$lib/types";
import type { Json } from "$lib/types/supabase-schema";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

export default class Logger {

	constructor(private supabase: SupabaseClient<SupabaseSchema>, private getSession: () => Promise<Session | null>) { }

	async log(opts: { message: string, userId?: string, details?: Json }) {
		let { data, error } = await this.supabase.from("logs").insert({
			user_id: (await this.getSession())?.user.id ?? opts.userId,
			message: opts.message,
			details: opts.details
		})
		if (error) throw error
	}
}
