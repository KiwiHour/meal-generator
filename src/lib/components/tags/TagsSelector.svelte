<script lang="ts">
    import { selectedTagIds } from "$stores";
    import NewTag from "./NewTag.svelte";
    import { page } from "$app/stores";
    import { Loading } from "..";

	function handleTagSelect(id: number) {
		if ($selectedTagIds.includes(id))
			$selectedTagIds = $selectedTagIds.filter(tagId => tagId != id)
		else
			$selectedTagIds = [...$selectedTagIds, id]
	}
	function handleNewTag(event: CustomEvent) {
		newTag = false
		$selectedTagIds = [...$selectedTagIds, event.detail.newTagId]
		triggerReload++ 
	}
	async function clearSelectedTags() {
		$selectedTagIds = []
	}

	// When triggerReload is incremented, the tags will be reloaded (due to the #key), but not the entire page
	// Which is what would happen when using invalidateAll(), this gives a much cleaner, more encapsulated feel
	export let selectedIds: number[] = [];
	let triggerReload = 0;
	let newTag = false;

	$selectedTagIds = selectedIds

</script>

<div id="tag-selector-container">

	{#key triggerReload}
		{#await $page.data.profile.getTags()}
			<Loading />
		{:then tags} 

			<div id="tags">
				{#each tags as tag}
					<input type="button"
						value={tag.name}
						class="tag {$selectedTagIds.includes(tag.id) ? 'selected' : ''}"
						on:click={() => handleTagSelect(tag.id)}>
				{/each}
			</div>

			{#if newTag}
				<NewTag on:new-tag-added={handleNewTag}/>
			{:else}
				<input id="new-tag-btn" type="button" value="+" on:click={() => newTag = true}>
			{/if}
			<input type="button" id="clear-selected-tags-btn" value="Clear" on:click={clearSelectedTags}>

		{/await}
	{/key}

</div>

<style>

	#tag-selector-container {
		border: 2px black solid;
		padding: 5px;
	}

	#tag-selector-container .tag, #tag-selector-container #new-tag-btn {
		cursor: pointer;
	}

	#tag-selector-container .tag.selected {
		background-color: lightblue;
	}

</style>