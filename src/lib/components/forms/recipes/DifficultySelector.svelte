<script>
    import { TimePaddedWrapper } from "$lib/components";
	import { difficulties } from "$stores";

	export let selectedId = -1;
</script>

<select name="difficultyId" id="difficulty">
	{#if !$difficulties}
		<TimePaddedWrapper>
			<option value="-1">Loading...</option>
		</TimePaddedWrapper>
	{:else}
		<option value="-1">Select difficulty</option>
		{#each $difficulties as difficulty}
			<option selected={difficulty.id == selectedId} value={difficulty.id}>
				{difficulty.name}
			</option>
		{/each}
	{/if}
</select>