<script lang="ts">
    import type { FormParams } from '$lib/types';
    import type { ActionData } from './$types';
	import { Error, Form } from '$lib/components';
    
    export let form: ActionData;

	let resetPasswordFormParams: FormParams = {
		action: "?/reset-password",
		method: "post",
		submitText: "Reset Password",
		fields: [
			{ type: "email", name: "email", placeholder: "Email" },
		]
	}
</script>


<Form params={resetPasswordFormParams} />
<Error error={form?.error} />

{#if form?.success}
	<p>Please check your email</p>
{/if}