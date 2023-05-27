<script lang="ts">
    import { titleizeString } from "$lib/functions";
    import { selectedIngredientIds } from "$stores";
    import { page } from "$app/stores";
    import { Loading } from "..";

	function handleIngredientSelect(id: number) {
		if ($selectedIngredientIds.includes(id)) {
			$selectedIngredientIds = $selectedIngredientIds.filter(ingredientId => ingredientId != id); console.log("lol") }
		else
			$selectedIngredientIds = [...$selectedIngredientIds, id]
	}
	function matchesQuery(qname: string) {
		return qname.toLowerCase().search(ingredientQuery.toLowerCase()) !== -1
	}
	function handleNewIngredient(id: number) {
		newIngredient = false
		ingredientQuery = ""
		$selectedIngredientIds = [...$selectedIngredientIds, id]
		triggerReload++
	}
	async function addIngredient() {
		if (confirm(`Add a new ingredient '${ingredientQuery}'?`)) {
			let { error, id } = await $page.data.profile.addIngredient({ name: ingredientQuery })
			if (error || !id) {
				// Could handle this error differently, maybe some red text, its flexible yknow
				alert(error?.message || "Invalid id upon adding");
				return;
			}
	
			handleNewIngredient(id as number)

		}
	}
	async function clearSelectedIngredients() {
		$selectedIngredientIds = []
	}

	// When triggerReload is incremented, the tags will be reloaded (due to the #key), but not the entire page
	// Which is what would happen when using invalidateAll(), this gives a much cleaner, more encapsulated feel
	let newIngredient: boolean;
	let ingredientQuery = "";
	let triggerReload = 0;

</script>

<div id="ingredient-selector-container">

	<!-- Outside of await block, as it's not required to have any of the information -->
	<form on:submit|preventDefault>
		<input type="search" id="ingredient-search" bind:value={ingredientQuery} placeholder="Search or add ingredients" autocomplete="off">
		<input type="submit" id="new-ingredient-btn" value="+" on:click={addIngredient}>
		<input type="button" id="clear-selected-ingredients-btn" value="Clear" on:click={clearSelectedIngredients}>
	</form>

	<div id="ingredients">
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
									class="ingredient {$selectedIngredientIds.includes(ingredient.id) ? 'selected' : ''}"
									on:click={() => handleIngredientSelect(ingredient.id)}>
							{/if}
						{/key}
					{/each}
				</div>

			{/await}
	{/key}
	</div>

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

	#ingredient-selector-container .ingredient, #ingredient-selector-container #new-ingredient-btn {
		cursor: pointer;
	}

	#ingredient-selector-container .ingredient.selected {
		background-color: lightblue;
	}


</style>