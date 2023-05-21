<script lang="ts">

	import { createEventDispatcher } from "svelte";
	import { page } from "$app/stores"

	async function addTag() {
		let values = { name }
		let { error, id } = await $page.data.profile.addTag(values)
		if (error)
			// Could handle this error differently, maybe some red text, its flexible yknow
			alert(error.message);
		else {
			await $page.data.logger.log({
				message: "newtag",
				details: {
					tagId: parseInt(id)
				}
			})
			dispatch("new-tag-added", { newTagId: id as number });
		}
	}

	let dispatch = createEventDispatcher()
	let name: string;

</script>

<div id="new-tag">
	<!-- Used a form so that user can press enter to submit -->
	<!-- Much cleaner than using a on:keypress with some if statements -->
	<form on:submit|preventDefault>
		<input type="text" id="tag-name" placeholder="New tag name" bind:value={name}>
		<input type="submit" value="Add tag" on:click={addTag}>
	</form>
</div>
