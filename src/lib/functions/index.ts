import type { StringForm } from "$lib/types"
import type { PostgrestError } from "@supabase/supabase-js"
import { error } from "@sveltejs/kit"

export function titleizeWord(word: string) {
	return word[0].toUpperCase() + word.slice(1)
}

export function titleizeString(str: string, mode: "first-word" | "most-words" | "all-words") {
	const BLACKLISTED_WORDS = ["a", "and", "as", "at", "but", "by", "down", "for", "from", "if", "in", "into", "like", "near", "nor", "of", "off",
		"on", "once", "onto", "or", "over", "past", "so", "than", "that", "to", "upon", "when", "with", "yet"]

	let words = str.split(" ")
	let titleizedWords = []
	for (let i = 0; i < words.length; i++) {
		let word = words[i]
		if (i == 0)
			word = titleizeWord(word)
		else {
			let isBlacklistedWord = BLACKLISTED_WORDS.includes(word.toLowerCase())
			if (mode == "all-words" || ("most-words" && !isBlacklistedWord))
				word = titleizeWord(word)
		}

		titleizedWords.push(word)

	}

	return titleizedWords.join(" ")
}

export function extractRecipeFormData(formData: FormData) {

	let { name, difficultyId, mealTypeId } = Object.fromEntries(formData) as StringForm
	let tagIds = formData.getAll("tagIds[]").map(tagId => parseInt(tagId as string))
	let ingredientIds = formData.getAll("ingredientIds[]").map(ingredientId => parseInt(ingredientId as string))

	return {
		name, tagIds, ingredientIds,
		difficultyId: parseInt(difficultyId),
		mealTypeId: parseInt(mealTypeId)
	}
}


export function getMethodLocation(clss: object, fn: Function) {
	return `${clss.constructor.name}.${fn.name}`
}

export function internalError(err: Error | PostgrestError | string, location?: string, status?: number) {
	let message = typeof err == "string" ? err : err.message

	return error(status ?? 500, { message, location })
}

export function sortAlphabeticallyByProperty<T>(arr: any[], property: string) {
	return arr.sort((a, b) =>
		a[property].toLowerCase() > b[property].toLowerCase() ? 1 :
			a[property].toLowerCase() < b[property].toLowerCase() ? -1 : 0) as T[]
}