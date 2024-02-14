export function getFaviconByUrl(inputUrl: string) {
	if (inputUrl.length !== 0) {
		const urlCreated = new URL(chrome.runtime.getURL('/_favicon/'));

		urlCreated.searchParams.set('pageUrl', inputUrl);
		urlCreated.searchParams.set('size', '32');

		return urlCreated.toString();
	}

	return '';
}
