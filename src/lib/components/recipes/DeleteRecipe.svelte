<script lang="ts">
    import { createEventDispatcher } from "svelte";
	import { Recipe } from "$lib/classes";
	import { page } from "$app/stores";
	
	async function deleteRecipe() {
		if (confirm("Are you sure you want to delete this recipe?")) {
			let recipe = new Recipe($page.data.supabase, id)
			await recipe.delete()

			await $page.data.logger.log({
				message: "deleterecipe",
				details: {
					recipeId: id.toString()
				}
			})
			dispatch("recipe-delete")
		}
	}

	export let id: number;
	let dispatch = createEventDispatcher()

</script>

<div id="delete-recipe-container">
	<input type="button" value="Delete" on:click={deleteRecipe}>
</div>
