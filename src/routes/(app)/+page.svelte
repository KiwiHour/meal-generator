<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

	export let data: PageData;

	async function addRecipe() {
		const { error } = await data.supabase.from("xref_recipe_ingredients").insert({
			recipe_id: 1,
			ingredient_id: 1
		})
		if (error) alert(error.message)
	}

</script>

{data.forename}

<input type="button" on:click={addRecipe} />