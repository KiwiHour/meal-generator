<script lang="ts">
    import type { FormProps } from "$lib/types";
    import type { ActionData } from "./$types";
    import { GenericFormError, GenericForm } from "$lib/components";

	export let form: ActionData;

	let registerFormParams: FormProps = {
		action: "?/register",
		method: "post",
		submitText: "Register",
		fields: [
			{ type: "email", name: "email", placeholder: "Email" },
			{ type: "password", name: "password", placeholder: "Password" },
			{ type: "password", name: "retypedPassword", placeholder: "Retyped password" },

			{ type: "text", name: "forename", placeholder: "Firstname" }
		]
	}
</script>

<GenericForm params={registerFormParams} />
<p>Already have an account? <a href="/login">Login</a></p>

{#if form?.success}
	<p>Please check your email inbox</p>
{/if}

<GenericFormError error={form?.error} />

