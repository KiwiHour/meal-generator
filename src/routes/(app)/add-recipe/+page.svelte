<script lang="ts">
    import { AddRecipe, GenericFormMessage, GenericFormError } from "$lib/components";
    import type { ActionData } from "./$types";

	export let form: ActionData
    
</script>

<AddRecipe>
	<GenericFormMessage message={form?.successMessage}/>
	<GenericFormError error={form?.error}/>
</AddRecipe>