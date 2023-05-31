<main>
	<slot />
</main>

<style>

	@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
	@import "$lib/styles";

	:global(html, body) {
		height: 100%;
		width: 100%;
		/* margin: 0; add back later!!! TODO*/
	}

	:global(main) {
		height: 100%;
		width: 100%;
	}
	
	* {
		font-family: "Open Sans";
	}

</style>