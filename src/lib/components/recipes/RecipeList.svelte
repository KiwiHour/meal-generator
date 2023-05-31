<script lang="ts">
    import { DeleteRecipe, Loading } from "..";
    import { Profile } from "$lib/classes";
	import { recipes } from "$stores";

	export let recipeQuery = "";

</script>

<div id="recipe-list">
	{#if $recipes}
		{#each Profile.searchRecipes($recipes, recipeQuery) as recipe}
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