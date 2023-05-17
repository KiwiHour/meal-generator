<script lang="ts">	
	export let error: { message: string } | undefined;
</script>

{#if error}
	<div id="form-error">
		<p id="detail">{error.message}</p>
	</div>
{/if}