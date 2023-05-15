<script lang="ts">
    import type { FormProps } from '$lib/types';
    import type { ActionData } from './$types';
	import { GenericFormError, GenericForm } from '$lib/components';
    
    export let form: ActionData;

	let resetPasswordFormParams: FormProps = {
		action: "?/reset-password",
		method: "post",
		submitText: "Reset Password",
		fields: [
			{ type: "email", name: "email", placeholder: "Email" },
		]
	}
</script>


<GenericForm params={resetPasswordFormParams} />
<GenericFormError error={form?.error} />

{#if form?.success}
	<p>Please check your email</p>
{/if}