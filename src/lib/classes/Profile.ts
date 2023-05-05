import type { SupabaseSchema } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export default class Profile {

	constructor(private supabase: SupabaseClient<SupabaseSchema>) { }

	// Validators


	// Getters
	private async getDetails() {
		let { data, error } = await this.supabase.from("profiles").select("*").single();
		if (error) throw error
		return data;
	}

	public async getForename() {
		let details = await this.getDetails();
		return details?.forename
	}

	// Setters

}