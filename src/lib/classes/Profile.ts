import supabase from "$lib/clients/supabase"

export default class Profile {

	constructor(private _id: string) { }

	// Validators


	// Getters
	private async getDetails() {
		let { data, error } = await supabase.from("profiles").select("*").eq("id", this._id).single();
		if (error) throw error
		return data;
	}
	public async getForename() {
		let details = await this.getDetails();
		return details?.forename
	}

	// Setters

}