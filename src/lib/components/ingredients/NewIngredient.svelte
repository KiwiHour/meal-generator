<script lang="ts">

	import { page } from "$app/stores"
	import { createEventDispatcher } from "svelte";

	let name: string;
	let dispatch = createEventDispatcher()

	async function addIngredient() {
		let values = { name }
		let { error, id } = await $page.data.profile.addIngredient(values)
		if (error)
			// Could handle this error differently, maybe some red text, its flexible yknow
			alert(error.message);
		else
			dispatch("new-ingredient-added", { newIngredientId: id as number });
	}

</script>

<div id="new-ingredient">
	<!-- Used a form so that user can press enter to submit -->
	<!-- Much cleaner than using a on:keypress with some if statements -->
	<form>
		<input type="text" id="ingredient-name" placeholder="New ingredient name" bind:value={name}>
		<input type="submit" value="Add ingredient" on:click={addIngredient}>
	</form>
</div>
