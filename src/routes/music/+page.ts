import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }: { fetch: Function }) => {
	
	try {
		// Fetch data from the API route
		const response = await fetch('/api/scores');
		const result = await response.json();
		
		 if (!result.success) {
            throw new Error(result.error || 'Failed to fetch scores');
        }

		return {
			scores: result.data			
		};
	}
	catch (error) {
		console.error('Error loading scores: ', error);
		return {
			scores: [],
			error: 'Unable to load scores'
		}
	}
};
