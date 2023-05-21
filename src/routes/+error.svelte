<script lang="ts">
	import { page } from "$app/stores";
    import { onMount } from "svelte";

	onMount(async () => {
		// If no error, the details are null
		// But if there is an error, details is { error: <TheError> }
		// This way an empty object isnt added to the DB
		// just "null" is better than { error: null }, much more consistent with rest of logs
		await $page.data.logger.log({
			message: "error",
			details: {
				error: $page.error ?? null,
				route: $page.url.pathname,
				href: $page.url.href
			}
		})
	})

</script>

<h1>Whoops...</h1>
<p>{$page.error?.message}</p>
{#if $page.error?.location}
	<p>error origin: <i>{$page.error.location}</i></p>
{/if}
<br />
<a href="/">Go home</a>