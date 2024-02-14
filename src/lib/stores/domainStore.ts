import type { Domain } from '$lib/types/Domain';
import { writable } from 'svelte/store';

export const domainsStore = writable<Domain[]>([]);

import { getFaviconByUrl } from '$lib/utils/faviconUtils';

export async function getAllDomains() {
	const tabs = await chrome.tabs.query({});

	const domainsMap = new Map<string, number>();
	tabs.forEach((tab) => {
		const url = new URL(tab.url!);
		const hostname = url.hostname;
		if (domainsMap.has(hostname)) {
			domainsMap.set(hostname, domainsMap.get(hostname) + 1);
		} else {
			domainsMap.set(hostname, 1);
		}
	});

	if (domainsMap) {
		const uniqueDomains = Array.from(domainsMap.entries())
			// .filter(([_, value]) => value > 1)
			.map(async ([key, value]) => {
				const favicon = await getFaviconByUrl(`https://${key}`);
				return { title: key, numOfAppearance: value, favicon };
			});
		const resolvedUniqueDomains = await Promise.all(uniqueDomains);
		domainsStore.set(resolvedUniqueDomains);
	}
}

/**
 * Navigates to the first tab of a specified domain.
 * @param {string} domain - The domain to navigate to.
 * @returns {Promise<void>} - A promise that resolves once the navigation is complete.
 */
export async function navigateToFirstTabOfDomain(domain: string) {
	const tabs = await chrome.tabs.query({});

	const firstTab = tabs.find((tab) => {
		const tabDomain = new URL(tab.url!).hostname;
		return tabDomain.includes(domain);
	});

	if (firstTab) {
		chrome.tabs.update(firstTab.id as number, { active: true });
	}
}
