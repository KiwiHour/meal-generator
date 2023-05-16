import { writable } from "svelte/store";

export let selectedIngredientIds = writable<number[]>([])
export let selectedTagIds = writable<number[]>([])

export let apiCalls = writable(0)