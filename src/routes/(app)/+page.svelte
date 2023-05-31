<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<p>Hello {data.forename}</p>
<a href="/manage-recipes">Manage recipes</a>