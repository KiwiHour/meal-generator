<script lang="ts">
	import { GenericFormMessage, GenericFormFailure, RecipeList, SearchRecipes, TagsSelector, IngredientsSelector } from "$lib/components";
    import { DifficultySelector, MealTypeSelector, NameInput, SelectIngredients, SelectTags } from "$lib/components/forms/recipes";
    import type { ActionData, PageData } from "./$types";
    import { invalidateAll } from "$app/navigation";
    import { openMenu } from "$stores";

	export let form: ActionData
	export let data: PageData
	let recipeQuery: string;

</script>

<h2>Add a new recipe</h2>

<form action="?/add-recipe" method="post">
	<NameInput />
	<DifficultySelector />
	<MealTypeSelector />
	<SelectTags />
	<SelectIngredients />
	<input type="submit" value="Add recipe">

	<GenericFormMessage message={form?.success?.message}/>
	<GenericFormFailure failure={form?.failure}/>
</form>

{#if $openMenu == "tags-selector"}
	<TagsSelector />
{:else if $openMenu == "ingredients-selector"}
	<IngredientsSelector />
{/if}

<h2>Your recipes</h2>
<SearchRecipes bind:recipeQuery/>
<RecipeList on:recipe-delete={invalidateAll} {recipeQuery}/>