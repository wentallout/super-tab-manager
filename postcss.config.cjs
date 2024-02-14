const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

const config = {
	plugins: [
		postcssPresetEnv({
			stage: 5,
			features: {
				'nesting-rules': true,
				'custom-media-queries': true,
				'media-query-ranges': true
			}
		}),
		autoprefixer
	]
};

module.exports = config;
