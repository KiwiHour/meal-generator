import { getMethodLocation, internalError } from "$lib/functions";
import type { SupabaseSchema } from "$lib/types";
import type { Json } from "$lib/types/supabase-schema";
import type { SupabaseClient } from "@supabase/supabase-js";

export default class Logger {

	constructor(private supabase: SupabaseClient<SupabaseSchema>) { }

	async log(opts: { message: string, userId?: string, details?: Json }) {
		let { error: err } = await this.supabase.from("logs").insert({
			user_id: (await this.supabase.auth.getSession())?.data.session?.user.id ?? opts.userId,
			message: opts.message,
			details: opts.details
		})

		if (err) throw internalError(err, getMethodLocation(this, this.log))
	}
}
