<script lang="ts">
	import { RecipeForm, GenericFormMessage, GenericFormError, RecipeList } from "$lib/components";
    import type { ActionData, PageData } from "./$types";
    import { invalidateAll } from "$app/navigation";

	export let form: ActionData
	export let data: PageData

	// Define reactively so page is refreshed on invalidateAll
	$: ({ recipies, difficulties, mealTypes } = data)
</script>

<h2>Add a new recipe</h2>
<RecipeForm on:submit-complete={invalidateAll}
	{difficulties} {mealTypes}
	
	formSubmitButtonText="Add recipe"
	formAction="?/add-recipe"
>
	<GenericFormMessage message={form?.success?.message}/>
	<GenericFormError error={form?.error}/>
</RecipeForm>

<h2>Your recipies</h2>
<RecipeList on:recipe-delete={invalidateAll} {recipies} />