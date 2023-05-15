<script lang="ts">
    import { AddRecipe, GenericFormMessage, GenericFormError } from "$lib/components";
    import type { ActionData } from "./$types";

	export let form: ActionData
    
</script>

<h2>Add a new recipe</h2>
<AddRecipe>
	<GenericFormMessage message={form?.success?.message}/>
	<GenericFormError error={form?.error}/>
</AddRecipe>