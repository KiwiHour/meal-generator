<script lang="ts">

	import type { ActionData, PageData } from "./$types";
    import { GenericFormError, GenericFormMessage, RecipeForm } from "$lib/components";
    import DeleteRecipe from "$lib/components/recipies/DeleteRecipe.svelte";
    import { invalidateAll } from "$app/navigation";
	
	export let form: ActionData
	export let data: PageData
	$: ({ recipe, difficulties, mealTypes } = data)

</script>

<a href="/manage-recipies">Manage your other recipies</a>
{#key data}
	<div id="recipe-container">
		<h2>Update recipe</h2>
		<RecipeForm on:submit-complete={() => {console.log("yep"); invalidateAll()}}
			ingredientIds={recipe.ingredients.map(ingredient => ingredient.id)}
			tagIds={recipe.tags.map(tag => tag.id)}
			difficultyId={recipe.difficulty.id}
			mealTypeId={recipe.mealType.id}
			{difficulties} {mealTypes}
			name={recipe.name}

			formSubmitButtonText="Update recipe"
			formAction={`?/update-recipe&id=${recipe.id}`}
		>

			<DeleteRecipe on:recipe-delete={invalidateAll} id={recipe.id} />
			<GenericFormMessage message={form?.success?.message}/>
			<GenericFormError error={form?.error}/>

		</RecipeForm>
	</div>
{/key}