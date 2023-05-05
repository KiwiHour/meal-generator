import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	return {
		forename: await event.locals.profile.getForename()
	}
};