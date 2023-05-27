<script lang="ts">
    import type { SupabaseTables } from "$lib/types";
    import { recipes } from "$stores";
    import { Loading } from "..";
    import DeleteRecipe from "./DeleteRecipe.svelte";

</script>

<div id="recipe-list">
	{#if $recipes}
		{#each $recipes as recipe}
			<div class="recipe">
				<p>{recipe.name}</p>
				<a href="/manage-recipe?id={recipe.id}">Manage recipe</a>
				<DeleteRecipe id={recipe.id} on:recipe-delete />
			</div>
		{/each}
	{:else}
		<Loading />
	{/if}
</div>

<style>

	.recipe {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 20px;
	}

</style>