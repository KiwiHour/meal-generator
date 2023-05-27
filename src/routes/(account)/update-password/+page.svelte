<script lang="ts">
    import type { ActionData } from './$types';
    import { GenericFormFailure, GenericForm } from '$lib/components';
    import type { FormProps } from '$lib/types';
    
    export let form: ActionData;

	let updatePasswordFormParams: FormProps = {
		action: "?/update-password",
		method: "post",
		submitText: "Update Password",
		fields: [
			{ type: "password", name: "newPassword", placeholder: "Password" },
			{ type: "password", name: "newRetypedPassword", placeholder: "Retyped password" },
		]
	}
</script>

<GenericForm params={updatePasswordFormParams} />
<GenericFormFailure failure={form?.error} />

{#if form?.success}
	<p>Password successfully updated. <a href="/login">Login</a> to your account</p>
{/if}