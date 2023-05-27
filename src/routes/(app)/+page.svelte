<script lang="ts">
    import { invalidateAll } from "$app/navigation";
import { Loading } from "$lib/components";
import { consistentDerived, recipes } from "$stores";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<p>Hello {data.forename}</p>
<a href="/manage-recipes">Manage recipes</a>

<div>
	{#if !$recipes}
		<Loading />
	{:else}
		{JSON.stringify($recipes)}
		<input type="button" value="inv" on:click={invalidateAll} />
	{/if}
</div>