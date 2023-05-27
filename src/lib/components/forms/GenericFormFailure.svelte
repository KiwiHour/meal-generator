<script lang="ts">	
	export let failure: { message: string } | undefined;
</script>

{#if failure}
	<div id="form-failure">
		<p id="detail">{failure.message}</p>
	</div>
{/if}