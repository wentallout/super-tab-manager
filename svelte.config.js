import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [preprocess({})],

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
