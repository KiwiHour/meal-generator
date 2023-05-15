<script lang="ts">

	let padding = true;
	// If the information doesn't load within 500ms, show loading screen
	setTimeout(() => padding = false, 500)

</script>

{#if !padding}
	<p>Loading...</p>
{/if}