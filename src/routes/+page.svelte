<script lang="ts">
    import type { ActionData, PageData } from "./$types";

	export let data: PageData;
	export let form: ActionData;
</script>

<form action="?/register" method="post" autocomplete="off">
	<input type="email" name="email" placeholder="Email">
	<input type="password" name="password" placeholder="Password">
	<input type="password" name="retyped-password" placeholder="Retyped Password">
	<input type="submit" value="register">
</form>

<br/>

<form action="?/login" method="post" autocomplete="off">
	<input type="email" name="email" placeholder="Email">
	<input type="password" name="password" placeholder="Password">
	<input type="submit" value="login">
</form>

<a href="/root">lol</a>

{form?.error_message}

{data.user?.email} <!-- CHECK ONCE ON VERCEL Possibly shares stuff between clients???? try logging in on phone with 4g to see if it doesnt track it -->