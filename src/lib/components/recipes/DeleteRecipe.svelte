<script lang="ts">
    import { createEventDispatcher } from "svelte";
	import { Recipe } from "$lib/classes";
	import { page } from "$app/stores";
	
	async function deleteRecipe() {
		let confirmation = confirm("Are you sure you want to delete this recipe?")
		if (!confirmation) return;

		let recipe = new Recipe($page.data.supabase, $page.data.logger, id)
		await recipe.delete()

		dispatch("recipe-delete")
	}

	export let id: number;
	let dispatch = createEventDispatcher()

</script>

<div id="delete-recipe-container">
	<input type="button" value="Delete" on:click={deleteRecipe}>
</div>
