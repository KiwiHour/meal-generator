// See https://kit.svelte.dev/docs/types#app
import type { Profile } from "$lib/classes";
import type { SupabaseSchema } from "$lib/types";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			profile: Profile
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
