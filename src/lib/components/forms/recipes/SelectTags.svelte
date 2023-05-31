<script lang="ts">
    import { openMenu, selectedTagIds } from "$stores";
</script>

<input type="button" value="Select tags" on:click={() => openMenu.toggle("tags-selector")}>
{#each $selectedTagIds as tagId}
	<input type="hidden" name="tagIds[]" value={tagId}>
{/each}