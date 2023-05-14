import type { SupabaseSchema } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export default class Profile {

	constructor(private supabase: SupabaseClient<SupabaseSchema>) { }

	// Validators


	// Getters
	private async getDetails() {
		let { data, error } = await this.supabase.from("profiles").select("*").single();
		console.log(((await this.supabase.from("profiles").select("*")).data as any))
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
	public async getLogs() {
		// USERS HAVE THE RIGHT TO SEE THEIR OWN LOGS, DAMNIT!
		let { data: logs, error } = await this.supabase.from("logs").select("*");
		if (error) throw error
		return logs ?? []
	}


	// Setters

}