<script lang="ts">
    import { ingredients, openMenu, selectedIngredientIds } from "$stores";
    import { titleizeString } from "$lib/functions";
    import { invalidateAll } from "$app/navigation";
    import { page } from "$app/stores";
    import { Loading } from "..";

	function matchesQuery(qname: string) {
		return qname.toLowerCase().search(ingredientQuery.toLowerCase()) !== -1
	}

	async function addIngredient() {
		let confirmed = confirm(`Add a new ingredient '${ingredientQuery}'?`)
		if (!confirmed) return;

		let { failure, id } = await $page.data.profile.addIngredient({ name: ingredientQuery })
		if (failure || !id) {
			// Should handle this error differently, maybe some red text, its flexible yknow
			alert(failure?.message || "Invalid id upon adding");
			return;
		}

		// Reset related variables and reload data
		ingredientQuery = ""
		selectedIngredientIds.toggle(id)
		invalidateAll()
	}

	let ingredientQuery = "";

</script>

<div class="selector-container" id="ingredient-selector-container">
	{#if !$ingredients}
		<Loading />
	{:else} 

		<input type="button" value="X" on:click={openMenu.clear} style="float: right">

		<!-- Outside of await block, as it's not required to have any of the information -->
		<form on:submit|preventDefault>
			<input type="search" id="ingredient-search" bind:value={ingredientQuery} placeholder="Search or add ingredients" autocomplete="off">
			<input type="submit" id="new-ingredient-btn" value="+" on:click={addIngredient}>
			<input type="button" id="clear-selected-ingredients-btn" value="Clear" on:click={selectedIngredientIds.clear}>
		</form>

		<div id="ingredients">

			{#each $ingredients as ingredient}
				{#key ingredientQuery}
					{#if matchesQuery(ingredient.name)}
						<input type="button"
							value={titleizeString(ingredient.name, "most-words")}
							class="ingredient {$selectedIngredientIds.includes(ingredient.id) ? 'selected' : ''}"
							on:click={() => selectedIngredientIds.toggle(ingredient.id)}>
					{/if}
				{/key}
			{/each}

		</div>

	{/if}
</div>

<style>

	#ingredient-selector-container {

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