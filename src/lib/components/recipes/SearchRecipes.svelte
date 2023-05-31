<script lang="ts">
	export let recipeQuery: string = "";
</script>

<input type="text" name="qname" bind:value={recipeQuery} placeholder="Search recipes" autocomplete="off" />