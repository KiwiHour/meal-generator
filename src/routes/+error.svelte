<script lang="ts">
	import { page } from "$app/stores";
</script>

<h1>Whoops...</h1>
<p>{$page.error?.message}</p>