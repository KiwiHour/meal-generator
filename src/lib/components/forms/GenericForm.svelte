<script lang="ts">
    import type { FormProps } from "$lib/types";
	
	export let params: FormProps;
</script>

	<form action={params.action} method={params.method} class="generic-form">
		<div class="fields">
			{#each params.fields as field}
				<input id={field.id} type={field.type} name={field.name} placeholder={field.placeholder} required>
			{/each}
		</div>
		<div class="submit">
			<input type="submit" value={params.submitText}>
		</div>
	</form>

<style>

	.generic-form {
		width: 15%;
	}

	.generic-form .fields {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}

	.generic-form .submit {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.generic-form .submit input[type="submit"] {
		width: 50%;
	}

</style>