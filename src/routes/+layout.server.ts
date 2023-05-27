import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession, profile } }) => {
	return {
		session: await getSession()
	};
};