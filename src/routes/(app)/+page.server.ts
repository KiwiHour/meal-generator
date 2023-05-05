import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	return {
		forename: event.locals.profile.getForename()
	}
};