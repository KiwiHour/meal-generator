// See https://kit.svelte.dev/docs/types#app
import type { Profile, Mailer } from "$lib/classes";
import type { SupabaseSchema } from "$lib/types";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			profile: Profile
			supabase: SupabaseClient<SupabaseSchema>
			mailer: Mailer
			getSession(): Promise<Session | null>;
			getUser(): Promise<User | null>
		}
		interface PageData {
			session: Session | null;
		}
		// interface Platform {}
	}
}

export { };
