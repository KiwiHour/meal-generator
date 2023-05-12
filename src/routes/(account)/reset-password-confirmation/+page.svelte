<script lang="ts">
    import { onMount } from "svelte";

	// Quite a horrific way to deal with the supabase session fuckery
	// But its basically inivisible to the client so... eh... its been 5 hours
	// Sometimes jank is the best way

	// For future me who may decide he wants to fix this
	// When clicking the confirmation link in the email after requesting a password reset
	// It loads a bunch of access_token stuff that gets parsed by the supabase client upon a request being resolved
	// Redirecting it doesnt actually finish the request so it's not parsed.
	// This is the 'cleanest' solution i could come up with
	onMount(() => {
		window.location.pathname = "/update-password"
	})

</script>