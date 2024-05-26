export function getFaviconByUrl(url: string) {
	if (url.length !== 0) {
		const urlCreated = new URL(chrome.runtime.getURL('/_favicon/'));

		urlCreated.searchParams.set('pageUrl', url);
		urlCreated.searchParams.set('size', '32');

		return urlCreated.toString();
	}

	return '';
}
