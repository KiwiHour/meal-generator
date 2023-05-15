// See https://kit.svelte.dev/docs/types#app
import type { Profile, Mailer, Logger } from "$lib/classes";
import type { SupabaseSchema } from "$lib/types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			profile: Profile
			supabase: SupabaseClient<SupabaseSchema>
			mailer: Mailer
			logger: Logger
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
			supabase: SupabaseClient<SupabaseSchema>;
			profile: Profile
		}
		// interface Platform {}
	}
}

export { };
