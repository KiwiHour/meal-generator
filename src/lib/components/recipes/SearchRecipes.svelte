<script lang="ts">
    import { onMount, tick } from "svelte";

	async function resetForm() {
		qname = "";

		// await qname modification to update form
		await tick()
		formEl.submit()
	}

	let formEl: HTMLFormElement;
	let qname = "";

</script>

<form bind:this={formEl} method="GET">
	<input type="text" name="qname" bind:value={qname} placeholder="Search recipes" />
	<input type="submit" value="Search">
	<input type="button" value="Reset" on:click={resetForm}>
</form>