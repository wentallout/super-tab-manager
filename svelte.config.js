import adapter from '@sveltejs/adapter-static';

import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [sveltePreprocess({})],

	kit: {
		adapter: adapter(),
		appDir: 'app',
		csrf: {
			checkOrigin: false
		},
		alias: {
			$components: './src/lib/components',
			$stores: './src/lib/stores'
		}
	}
};

export default config;
