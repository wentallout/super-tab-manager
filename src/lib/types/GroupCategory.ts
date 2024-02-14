export type CustomCategory = {
	categoryTitle: string;
	urls: string[];
};

export let sampleCategoryList: CustomCategory[] = [
	{
		categoryTitle: 'Work',
		urls: [
			'docs.google.com',
			'www.figma.com',
			'linkedin.com',
			'indeed.com',
			'glassdoor.com',
			'careerbuilder.com'
		]
	},
	{
		categoryTitle: 'Music',
		urls: ['spotify.com', 'soundcloud.com']
	},
	{
		categoryTitle: 'Entertainment',
		urls: ['youtube.com', 'netflix.com', 'hulu.com', 'twitch.tv']
	},
	{
		categoryTitle: 'News',
		urls: [
			'bbc.com',
			'cnn.com',
			'nytimes.com',
			'washingtonpost.com',
			'reuters.com',
			'theguardian.com',
			'foxnews.com',
			'nbcnews.com',
			'usatoday.com',
			'abcnews.go.com',
			'ign.com'
		]
	}
];
