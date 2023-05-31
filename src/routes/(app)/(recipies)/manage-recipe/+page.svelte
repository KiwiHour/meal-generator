<script lang="ts">

    import { DifficultySelector, MealTypeSelector, NameInput, SelectIngredients, SelectTags } from "$lib/components/forms/recipes";
    import { GenericFormFailure, GenericFormMessage, IngredientsSelector, TagsSelector } from "$lib/components";
    import { openMenu, selectedIngredientIds, selectedTagIds } from "$stores";
	import type { ActionData, PageData } from "./$types";

	export let form: ActionData
	export let data: PageData
	$: ({ recipe } = data)

	$: selectedTagIds.set(recipe.tags.map(tag => tag.id))
	$: selectedIngredientIds.set(recipe.ingredients.map(ingredient => ingredient.id))

</script>

<a href="/manage-recipes">Manage your other recipes</a>

<h2>Update recipe</h2>
<form action="?/update-recipe&id={recipe.id}" method="post">
	<NameInput currentName={recipe.name}/>
	<DifficultySelector selectedId={recipe.difficulty.id}/>
	<MealTypeSelector selectedId={recipe.mealType.id}/>
	<SelectTags />
	<SelectIngredients />
	<input type="submit" value="Update recipe">

	<GenericFormMessage message={form?.success?.message}/>
	<GenericFormFailure failure={form?.failure}/>
</form>

{#if $openMenu == "tags-selector"}
	<TagsSelector />
{:else if $openMenu == "ingredients-selector"}
	<IngredientsSelector />
{/if}
