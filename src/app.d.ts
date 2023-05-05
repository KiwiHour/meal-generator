// See https://kit.svelte.dev/docs/types#app
import type { Profile } from "$lib/classes";
import type { SupabaseSchema } from "$lib/types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			profile: Profile
			supabase: SupabaseClient<SupabaseSchema>
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Platform {}
	}
}

export { };
