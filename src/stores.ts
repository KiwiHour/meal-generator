import { page } from "$app/stores";
import type { SupabaseTables } from "$lib/types";
import { derived, writable } from "svelte/store";

/**
 * A dream of what could've been
 * A world where getting a list of recipes would be as simple as {$recipes} and update them easily as {$recipes.refresh}
 * If only....
 */
// export async function createRefreshableReadable<T>(getter: () => Promise<T> | T): Promise<RefreshableReadable<T>> {
// 	let { subscribe, set } = writable<T>(await getter())
// 	return {
// 		subscribe,
// 		refresh: async () => set(await getter())
// 	}
// }

export function consistentDerived<T>(stores: any, cb: (stores: any) => any) {
	let guard: any;

	return derived<any, T | undefined>(stores, ($stores, set) => {
		const inner = guard = {}

		// Set undefined while loading new data
		set(undefined)
		Promise.resolve(cb($stores)).then(value => {
			if (guard === inner) {
				set(value)
			}
		})
	}, undefined)
}

export let recipes = consistentDerived<SupabaseTables["recipes"]["Row"][]>(page, $page => $page.data.profile.getRecipes())
export let selectedIngredientIds = writable<number[]>([])
export let selectedTagIds = writable<number[]>([])