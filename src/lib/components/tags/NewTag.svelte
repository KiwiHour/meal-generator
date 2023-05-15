<script lang="ts">

	import { page } from "$app/stores"
    import { FormErrors } from "$lib/types";
	import { createEventDispatcher } from "svelte";

	let name: string;
	let dispatch = createEventDispatcher()

	async function addTag() {
		let values = { name }
		let { message } = await $page.data.profile.addTag(values)
		if (Object.values(FormErrors).includes(message as FormErrors))
			alert(message) // Could handle this error differently, maybe some red text, its flexible yknow
		else
			dispatch("new-tag-added")
	}

</script>

<div id="new-tag">
	<form>
		<input type="text" id="tag-name" placeholder="New tag name" bind:value={name}>
		<input type="submit" value="Add tag" on:click={addTag}>
	</form>
</div>
