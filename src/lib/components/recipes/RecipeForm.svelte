<script lang="ts">
	
	import type { SupabaseTables } from "$lib/types";
    import type { ActionResult } from "@sveltejs/kit";
    import { selectedIngredientIds, selectedTagIds } from "$stores";
    import { IngredientsSelector, TagsSelector } from "..";
    import { createEventDispatcher } from "svelte";
    import { enhance } from "$app/forms";

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
			openMenus = []
			dispatch("submit-complete")
		}
		update()
	}

	type MenuName = "tags-selector" | "ingredients-selector"

	export let difficulties: SupabaseTables["recipe_difficulties"]["Row"][];
	export let mealTypes: SupabaseTables["recipe_meal_types"]["Row"][];
	export let formSubmitButtonText: string;
	export let ingredientIds: number[] = []
	export let difficultyId: number = -1;
	export let mealTypeId: number = -1
	export let tagIds: number[] = []
	export let formAction: string;
	export let name: string = "";
	let dispatch = createEventDispatcher()
	let openMenus: MenuName[] = []
	
	// Update store with props
	// Outsourcing the store declaration to this component improves encapsulation
	$selectedIngredientIds = ingredientIds
	$selectedTagIds = tagIds

</script>

<div id="recipe-container">
	
	<form action={formAction} method="post" use:enhance={() => afterSubmit}>
		<input type="text" id="name" name="name" placeholder="Recipe name" value={name} required/>

		<select name="difficultyId" id="difficulty">
			<option value="-1">Select difficulty</option>
			{#each difficulties as difficulty}
				<option selected={difficulty.id == difficultyId} value={difficulty.id}>
					{difficulty.name}
				</option>
			{/each}
		</select>

		<select name="mealTypeId" id="meal-type">
			<option value="-1">Select meal type</option>
			{#each mealTypes as mealType}
				<option selected={mealType.id == mealTypeId} value={mealType.id}>
					{mealType.name}
				</option>
			{/each}
		</select>

		<input type="button" value="Select tags" on:click={() => toggleMenu("tags-selector")}>
		{#each $selectedTagIds as tagId}
			<!-- Attach the selected tag ids to the form -->
			<input type="hidden" name="tagIds[]" value={tagId}>
		{/each}
		
		<input type="button" value="Select ingredients" on:click={() => toggleMenu("ingredients-selector")}>
		{#each $selectedIngredientIds as ingredientId}
			<!-- Attach the selected ingredient ids to the form -->
			<input type="hidden" name="ingredientIds[]" value={ingredientId}>
		{/each}

		<input type="submit" value={formSubmitButtonText}>
	</form>

	{#if openMenus.includes("tags-selector")}
		<TagsSelector />
	{/if}
	{#if openMenus.includes("ingredients-selector")}
		<IngredientsSelector />
	{/if}

	<slot />
	
</div>