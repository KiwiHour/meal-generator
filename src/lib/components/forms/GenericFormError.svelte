<script lang="ts">
    import type { FormError } from "$lib/types";
	
	export let error: FormError | undefined;
</script>

{#if error}
	<div id="form-error">
		<p id="detail">{error.message}</p>
	</div>
{/if}