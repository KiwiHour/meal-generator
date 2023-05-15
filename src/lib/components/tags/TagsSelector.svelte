<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { page } from "$app/stores";
    import { Loading } from "..";
    import NewTag from "./NewTag.svelte";
    import { selectedTagIds } from "$store";

	export let selectedIds: number[];
	// When reload is redefined, the tags will be reloaded, but not the entire page (See on:new-tag-added)
	// Which is what would happen when using invalidateAll(), this gives a much cleaner, more encapsulated feel
	let triggerReload = 0;
	let newTag = false;
	let dispatch = createEventDispatcher()

	function handleTagSelect(id: number) {
		selectedTagIds.update(tagIds => {
			if (tagIds.includes(id))
				tagIds = tagIds.filter(tagId => tagId != id)
			else
				tagIds.push(id)

			return tagIds
		})
	}

	function handleNewTag(event: CustomEvent) {
		selectedTagIds.update(tagIds => {
			tagIds.push(event.detail.newTagId)
			return tagIds
		})
		newTag = false
		triggerReload++ 
	}

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
						class="tag {selectedIds.includes(tag.id) ? 'selected' : ''}"
						on:click={() => handleTagSelect(tag.id)}>
				{/each}
			</div>

			{#if newTag}
				<NewTag on:new-tag-added={handleNewTag}/>
			{:else}
				<input type="button" value="+" on:click={() => newTag = true}>
			{/if}

		{/await}
	{/key}

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