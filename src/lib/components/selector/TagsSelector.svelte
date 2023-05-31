<script lang="ts">
    import { openMenu, selectedTagIds, tags } from "$stores";
    import { invalidateAll } from "$app/navigation";
    import { page } from "$app/stores";
    import { Loading } from "..";

	async function addTag() {
		let confirmed = confirm(`Add a new ingredient '${tagQuery}'?`)
		if (!confirmed) return;

		let { failure, id } = await $page.data.profile.addTag({ name: tagQuery })
		if (failure || !id) {
			// Should handle this error differently, maybe some red text, its flexible yknow
			alert(failure?.message || "Invalid id upon adding");
			return;
		}

		// Reset related variables and reload data
		tagQuery = ""
		selectedTagIds.toggle(id)
		invalidateAll()
	}

	let tagQuery = "";

</script>

<div class="selector-container" id="tag-selector-container">
	{#if !$tags}
		<Loading />
	{:else} 

		<input type="button" value="X" on:click={openMenu.clear} style="float: right">

		<form on:submit|preventDefault>
			<input type="search" id="tag-search" bind:value={tagQuery} placeholder="Search or add tags" autocomplete="off">
			<input type="submit" id="new-tag-btn" value="+" on:click={addTag}>
			<input type="button" id="clear-selected-tags-btn" value="Clear" on:click={selectedTagIds.clear}>
		</form>

		<div id="tags">
			{#each $tags as tag}
				<input type="button"
					value={tag.name}
					class="tag {$selectedTagIds.includes(tag.id) ? 'selected' : ''}"
					on:click={() => selectedTagIds.toggle(tag.id)}>
			{/each}
		</div>

	{/if}

</div>

<style>

	#tag-selector-container {

	}

	#tag-selector-container .tag, #tag-selector-container #new-tag-btn {
		cursor: pointer;
	}

	#tag-selector-container .tag.selected {
		background-color: lightblue;
	}

</style>