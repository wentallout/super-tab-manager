export function formatTabDomain(url: string) {
	return new URL(url).hostname.replace(/^www\./, '');
}
