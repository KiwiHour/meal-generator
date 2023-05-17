<script lang="ts">
	import { page } from "$app/stores";
    import { error } from "@sveltejs/kit";

</script>

<h1>Whoops...</h1>
<p>{$page.error?.message}</p>
{#if $page.error?.location}
	<p>error origin: <i>{$page.error.location}</i></p>
{/if}
<br />
<a href="/">Go home</a>