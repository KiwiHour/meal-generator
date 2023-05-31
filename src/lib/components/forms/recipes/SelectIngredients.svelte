<script lang="ts">
    import { openMenu, selectedIngredientIds } from "$stores";
</script>

<input type="button" value="Select ingredients" on:click={() => openMenu.toggle("ingredients-selector")}>
{#each $selectedIngredientIds as ingredientId}
	<input type="hidden" name="ingredientIds[]" value={ingredientId}>
{/each}