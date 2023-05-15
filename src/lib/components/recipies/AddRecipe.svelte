<script lang="ts">
	
    import { enhance } from "$app/forms";
	import { page } from "$app/stores"
    import type { ActionResult } from "@sveltejs/kit";
    import { IngredientsSelector, Loading, TagsSelector } from "..";
    import { selectedIngredientIds, selectedTagIds } from "$store";

	type MenuName = "tags-selector" | "ingredients-selector"

	let ingredientIds: number[] = []
	let tagIds: number[] = []
	let openMenus: MenuName[] = []
	let showTagsSelector = false;

	selectedIngredientIds.subscribe(selectedIngredientIds => ingredientIds = selectedIngredientIds)	
	selectedTagIds.subscribe(selectedTagIds => {console.log(selectedTagIds); tagIds = selectedTagIds})	

	function toggleMenu(menuName: MenuName) {
		if (openMenus.find(openMenu => openMenu == menuName))
			openMenus = openMenus.filter(openMenu => openMenu != menuName)
		else
			openMenus = [...openMenus, menuName]
	}

	async function afterSubmit({ result, update }: { result: ActionResult, update(): void }) {
		if (result.type == "success") {
			ingredientIds = []
			tagIds = []
			showTagsSelector = false
		}
		update()
	}

</script>

<div id="add-recipe-container">
	{#await Promise.all([
		$page.data.profile.getDifficulties(),
		$page.data.profile.getMealTypes()
	])}
		<Loading />
	
	{:then [difficulties, mealTypes]} 

		<form action="?/add-recipe" method="post" use:enhance={() => afterSubmit}>
			<input type="text" id="name" name="name" placeholder="Recipe name" required/>

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

			<input type="button" value="Select tags" on:click={() => toggleMenu("tags-selector")}>
			{#each tagIds as tagId}
				<!-- Attach the selected tag ids to the form -->
				<input type="hidden" name="tagIds[]" value={tagId}>
			{/each}
			
			<input type="button" value="Select ingredients" on:click={() => toggleMenu("ingredients-selector")}>
			{#each ingredientIds as ingredientId}
				<!-- Attach the selected ingredient ids to the form -->
				<input type="hidden" name="ingredientIds[]" value={ingredientId}>
			{/each}

			<input type="submit" value="Add recipe">
		</form>

		{#if openMenus.includes("tags-selector")}
			<TagsSelector selectedIds={tagIds}/>
		{/if}
		{#if openMenus.includes("ingredients-selector")}
			<IngredientsSelector selectedIds={ingredientIds} />
		{/if}

		<slot />

	{/await}

	
</div>