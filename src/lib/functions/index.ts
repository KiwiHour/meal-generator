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