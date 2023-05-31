<script>
    import { TimePaddedWrapper } from "$lib/components";
	import { mealTypes } from "$stores";

	export let selectedId = -1;
</script>

<select name="mealTypeId" id="meal-type">
	{#if !$mealTypes}
		<TimePaddedWrapper>
			<option value="-1">Loading...</option>
		</TimePaddedWrapper>
	{:else}
		<option value="-1">Select meal type</option>
		{#each $mealTypes as mealType}
			<option selected={mealType.id == selectedId} value={mealType.id}>
				{mealType.name}
			</option>
		{/each}
	{/if}
</select>