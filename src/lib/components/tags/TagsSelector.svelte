<script lang="ts">
    import { page } from "$app/stores";
    import { createEventDispatcher } from "svelte";
    import { Loading } from "..";
    import NewTag from "./NewTag.svelte";
    import { invalidateAll } from "$app/navigation";

	export let selectedIds: number[];
	let newTag = false;
	let dispatch = createEventDispatcher()

	function handleTagSelect(id: number) {
		let operator = selectedIds.includes(id) ? "remove" : "add"
		dispatch(`selector-tag-event`, { tagId: id, operator })
	}

</script>

<div id="tag-selector-container">

	{#await $page.data.profile.getTags()}
		<Loading />
	{:then tags} 

		<div id="tags">
			{#each tags as tag}
				<input type="button"
					value={tag.name}
					class="tag {selectedIds.includes(tag.id) ? 'selected' : ''}"
					on:click={() => handleTagSelect(tag.id)}>
			{/each}
		</div>

		<div id="new-tag">
			{#if newTag}
				<NewTag on:new-tag-added={invalidateAll}/>
			{:else}
				<input type="button" value="+" on:click={() => newTag = true}>
			{/if}
		</div>
	{/await}

</div>

<style>

	#tag-selector-container {
		border: 2px black solid;
		padding: 5px;
	}

	#tag-selector-container .tag.selected {
		background-color: lightblue;
	}

</style>