<script lang="ts">
    import type { SupabaseTables } from "$lib/types";
    import DeleteRecipe from "./DeleteRecipe.svelte";
	
	export let recipies: SupabaseTables["recipies"]["Row"][];
</script>

<div id="recipe-list">
	{#each recipies as recipe}
		<div class="recipe">
			<p>{recipe.name}</p>
			<a href="/manage-recipe?id={recipe.id}">Manage recipe</a>
			<DeleteRecipe id={recipe.id} on:recipe-delete />
		</div>
	{/each}
</div>

<style>

	.recipe {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 20px;
	}

</style>