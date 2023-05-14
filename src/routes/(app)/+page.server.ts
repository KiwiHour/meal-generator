import type { PageServerLoad } from './$types';
import { Profile } from '$lib/classes';

export const load: PageServerLoad = async (event) => {
	return {
		forename: await event.locals.profile.getForename()
	}
};