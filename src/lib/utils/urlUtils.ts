//This function can handle subdomains and still match against the list. By removing subdomains and focusing on the domain name and TLD, it can detect websites more effectively.
export function formatTabDomain(url: string): string {
	const hostname = new URL(url).hostname; //get only the hostname of the URL
	return hostname
		.replace(/^www\./, '') //remove `www` from hostname
		.split('.')
		.slice(-2) //takes the last two elements of the array
		.join('.'); //join them into a string with a dot as the separator. final result: youtube.com
}
