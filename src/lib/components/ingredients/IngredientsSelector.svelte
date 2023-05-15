<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { page } from "$app/stores";
    import { Loading } from "..";
    import { titleizeString } from "$lib/functions";
    import NewIngredient from "./NewIngredient.svelte";
    import { selectedIngredientIds } from "$store";

	export let selectedIds: number[];
	// When reload is redefined, the tags will be reloaded, but not the entire page (See on:new-tag-added)
	// Which is what would happen when using invalidateAll(), this gives a much cleaner, more encapsulated feel
	let triggerReload = 0;
	let newIngredient: boolean;
	let ingredientQuery = "";
	let dispatch = createEventDispatcher()

	function handleIngredientSelect(id: number) {
		selectedIngredientIds.update(ingredientIds => {
			if (ingredientIds.includes(id))
				ingredientIds = ingredientIds.filter(ingredientId => ingredientId != id)
			else
				ingredientIds.push(id)

			return ingredientIds
		})
	}

	function matchesQuery(name: string) {
		return name.toLowerCase().search(ingredientQuery.toLowerCase()) !== -1
	}

	function handleNewIngredient(event: CustomEvent) {
		newIngredient = false
		ingredientQuery = ""
		selectedIngredientIds.update(ingredientIds => {
			ingredientIds.push(event.detail.newIngredientId)
			return ingredientIds
		})
		triggerReload++
	}

</script>

<div id="ingredient-selector-container">

	<!-- Outside of await block, as it's not required to have any of the information -->
	<input type="search" id="ingredient-search" bind:value={ingredientQuery} placeholder="Search ingredients">

	{#key triggerReload}
		{#await $page.data.profile.getIngredients()}
			<Loading />
		{:then ingredients} 

			<div id="ingredients">
				{#each ingredients as ingredient}
					{#key ingredientQuery}
						{#if matchesQuery(ingredient.name)}
							<input type="button"
								value={titleizeString(ingredient.name, "most-words")}
								class="ingredient {selectedIds.includes(ingredient.id) ? 'selected' : ''}"
								on:click={() => handleIngredientSelect(ingredient.id)}>
						{/if}
					{/key}
				{/each}
			</div>

			{#if newIngredient}
				<NewIngredient on:new-ingredient-added={handleNewIngredient}/>
			{:else}
				<input type="button" value="+" on:click={() => newIngredient = true}>
			{/if}

		{/await}
	{/key}

</div>

<style>

	#ingredient-selector-container {
		border: 2px black solid;
		padding: 5px;
		width: 250px
	}

	#ingredient-selector-container #ingredients {
		display: flex;
		flex-direction: column;
	}

	#ingredient-selector-container .ingredient.selected {
		background-color: lightblue;
	}


</style>