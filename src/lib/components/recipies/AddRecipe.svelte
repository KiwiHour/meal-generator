<script lang="ts">
	
    import { enhance } from "$app/forms";
	import { page } from "$app/stores"
    import { Loading, TagsSelector } from "..";

	let ingredientIds: number[] = []
	let tagIds: number[] = []

	let showTagsSelector = false;

	function toggleSelectTags() {
		showTagsSelector = !showTagsSelector
	}
	function handleTagSelect(event: CustomEvent) {
		let { tagId, operator } = event.detail;
		console.log(operator, tagId)
		if (operator == "add")
			// Sveltekit only reacts during a redefinition, so .push doesn't work for reactivity here
			tagIds = [...tagIds, tagId];
		else if (operator == "remove")
			tagIds = tagIds.filter(id => id != tagId);
	}

</script>

<div id="add-recipe-container">
	{#await Promise.all([
		$page.data.profile.getDifficulties(),
		$page.data.profile.getMealTypes()
	])}
		<Loading />
	
	{:then [difficulties, mealTypes]} 

		<form action="?/add-recipe" method="post" use:enhance>
			<input type="text" id="name" name="name" placeholder="Recipe name" />

			<select name="difficultyId" id="difficulty">
				<option value="-1">Select difficulty</option>
				{#each difficulties as difficulty}
					<option value={difficulty.id}>{difficulty.name}</option>
				{/each}
			</select>

			<select name="mealTypeId" id="meal-type">
				<option value="-1">Select meal type</option>
				{#each mealTypes as mealType}
					<option value={mealType.id}>{mealType.name}</option>
				{/each}
			</select>

			<input type="button" value="Select tags" on:click={toggleSelectTags}>
			{#each tagIds as tagId}
				<input type="hidden" name="tagIds[]" value={tagId}>
			{/each}

			<input type="submit" value="Add recipe">
		</form>

		{#if showTagsSelector}
			<TagsSelector selectedIds={tagIds} on:selector-tag-event={handleTagSelect} />
		{/if}

		<slot />

	{/await}

	
</div>