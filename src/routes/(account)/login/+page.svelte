<script lang="ts">
    import type { FormParams } from "$lib/types";
	import type { ActionData } from "./$types";
    import { Error, Form } from "$lib/components";

	export let form: ActionData;

	let loginFormParams: FormParams = {
		action: "?/login",
		method: "post",
		submitText: "Login",
		fields: [
			{ type: "email", name: "email", placeholder: "Email" },
			{ type: "password", name: "password", placeholder: "Password" }
		]
	}
</script>

<Form params={loginFormParams} />
<p><a href="/reset-password">Forgot your password?</a></p>
<p>Need an account? <a href="/register">Register</a></p>

<Error error={form?.error} />
