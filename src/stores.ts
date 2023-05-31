import type { ToggleableArrayWritable, Stores, SupabaseTables, ToggleableWritable } from "$lib/types";
import { derived, writable } from "svelte/store";
import { page } from "$app/stores";

/**
 * Allows a derived store to work with async functions, refreshes automatically
 * @param stores Array of required stores needed for the callback function
 * @param cb Function that returns the store's new contents
 * @param consistent Wipe the store while obtaining the new data?
 * If false, the the store contents will be overriden once the callback function resolves.
 * If true, the store contents will be set to undefined while retreiving the new data, then set once the callback function resolve
 * @returns 
 */
function asyncDerived<T>(stores: Stores, cb: (values: any) => T, consistent: boolean) {
	let guard: any;

	return derived<any, T | undefined>(stores, ($stores, set) => {
		const inner = guard = {}

		// Set undefined while loading new data
		if (consistent)
			set(undefined)

		Promise.resolve(cb($stores)).then(value => {
			if (guard === inner) {
				set(value)
			}
		})
	}, undefined)
}

/**
 * A writable that stores an array of currently selected 
 * @param values Inital array of selected values
 * @returns writable store with the functions: toggle(value) and clear()
 */
function toggleableArrayWritable<T>(values: T[]): ToggleableArrayWritable<T> {
	let { subscribe, set, update } = writable(values)

	return {
		subscribe, set, update,
		clear: () => set([]),
		toggle: (value: T) => {
			update(selectedValues => {
				if (selectedValues.includes(value)) {
					return selectedValues.filter(e => e != value)
				}
				else
					return [...selectedValues, value]
			})
		}
	}
}

/**
 * Works similarly to the toggleableArrayWritable, but for a single value this time
 * @param value inital starting value
 * @returns writeable store with the functions: toggle(value) and clear()
 */
function toggleableWriteable<T>(value: T | null = null): ToggleableWritable<T> {
	let { subscribe, set, update } = writable<T | null>(value)

	return {
		subscribe, set, update,
		clear: () => set(null),
		toggle: (val: T) => {
			update(selectedValue => {
				if (selectedValue == val)
					return null;
				else
					return val
			})
		}
	}
}

export let recipes = asyncDerived<SupabaseTables["recipes"]["Row"][]>(page, $page => $page.data.profile.getRecipes(), false)
export let tags = asyncDerived<SupabaseTables["recipe_tags"]["Row"][]>(page, $page => $page.data.profile.getTags(), false)
export let ingredients = asyncDerived<SupabaseTables["recipe_ingredients"]["Row"][]>(page, $page => $page.data.profile.getIngredients(), false)
export let difficulties = asyncDerived<SupabaseTables["recipe_difficulties"]["Row"][]>(page, $page => $page.data.profile.getDifficulties(), false)
export let mealTypes = asyncDerived<SupabaseTables["recipe_meal_types"]["Row"][]>(page, $page => $page.data.profile.getMealTypes(), false)

export let openMenu = toggleableWriteable<string>()
export let selectedIngredientIds = toggleableArrayWritable<number>([])
export let selectedTagIds = toggleableArrayWritable<number>([])