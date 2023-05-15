<script lang="ts">
    import type { PageData } from "./$types";

	export let data: PageData;
</script>

<p>Hello {data.forename}</p>

<a href="/manage-recipies">Manage recipies</a>