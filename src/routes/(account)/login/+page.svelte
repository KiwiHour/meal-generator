<script lang="ts">
    import type { FormProps } from "$lib/types";
	import type { ActionData } from "./$types";
    import { GenericFormError, GenericForm } from "$lib/components";

	export let form: ActionData;

	let loginFormParams: FormProps = {
		action: "?/login",
		method: "post",
		submitText: "Login",
		fields: [
			{ type: "email", name: "email", placeholder: "Email" },
			{ type: "password", name: "password", placeholder: "Password" }
		]
	}
</script>

<GenericForm params={loginFormParams} />
<p><a href="/reset-password">Forgot your password?</a></p>
<p>Need an account? <a href="/register">Register</a></p>

<GenericFormError error={form?.error} />
