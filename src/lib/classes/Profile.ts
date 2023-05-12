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
		if (!details?.forename) throw new Error("Could not get profile's 'forename'")
		return details.forename
	}
	public async isNew() {
		let details = await this.getDetails();
		if (!details?.forename) throw new Error("Could not get profile's 'is_new_profile'")
		return details?.is_new_profile ?? true // defaults to false if undefined
	}


	// Setters

}