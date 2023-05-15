<script lang="ts">
	export let message: string | undefined;
</script>

{#if message}
	<div id="form-message">
		<p id="detail">{message}</p>
	</div>
{/if}