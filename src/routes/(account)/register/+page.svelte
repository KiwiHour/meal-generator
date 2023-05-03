<script lang="ts">
    import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<main>
	
	<form action="?/register" method="post" autocomplete="off" class="generic-form">
		<!-- Supabase auth user -->
		<input type="email" name="email" placeholder="Email" required>
		<input type="password" name="password" placeholder="Password" required>
		<input type="password" name="retypedPassword" placeholder="Retyped Password" required>
	
		<!-- Profile details -->
		<input type="text" name="forename" placeholder="Firstname" required>
	
		<input type="submit" value="register">
	</form>

	{#if form?.success}
		<p>Please check your email inbox</p>
	{/if}
	
	<p>Already have an account? <a href="/login">Login</a></p>

	<!-- make a component for this -->
	{form?.error_message ? form.error_message : ""}

</main>
