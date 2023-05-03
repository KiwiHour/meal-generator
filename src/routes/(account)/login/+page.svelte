<script lang="ts">
    import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<main>

	<form action="?/login" method="post" autocomplete="off" class="generic-form">
		<input type="email" name="email" placeholder="Email" required>
		<input type="password" name="password" placeholder="Password" required>
		<input type="submit" value="login">
	</form>
	
	<p>Need an account? <a href="/register">Register</a></p>
	
	{form?.error_message ? form.error_message : ""}	

</main>
