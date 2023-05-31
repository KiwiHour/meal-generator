<script lang="ts">

	export let paddingLengthMs = 150;
	let padding = true;

	// Show slot after 500ms by default
	setTimeout(() => padding = false, paddingLengthMs)

</script>

{#if !padding}
	<slot />
{/if}