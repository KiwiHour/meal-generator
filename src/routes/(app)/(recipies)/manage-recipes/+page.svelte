<script lang="ts">
	import { RecipeForm, GenericFormMessage, GenericFormFailure, RecipeList, SearchRecipes } from "$lib/components";
    import type { ActionData, PageData } from "./$types";
    import { invalidateAll } from "$app/navigation";
	import { recipes } from "$stores";

	export let form: ActionData
	export let data: PageData

	// Define reactively so page is refreshed on invalidateAll
	$: ({ difficulties, mealTypes } = data)

</script>

<h2>Add a new recipe</h2>
<RecipeForm on:submit-complete={invalidateAll}
	{difficulties} {mealTypes}
	
	formSubmitButtonText="Add recipe"
	formAction="?/add-recipe"
>
	<GenericFormMessage message={form?.success?.message}/>
	<GenericFormFailure failure={form?.failure}/>
</RecipeForm>

<h2>Your recipes</h2>
<SearchRecipes />
<RecipeList on:recipe-delete={invalidateAll} />