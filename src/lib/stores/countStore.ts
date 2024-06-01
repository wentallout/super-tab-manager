import { writable } from 'svelte/store';
import { getNsfwList, getSocialList } from '$stores/filterListStore';
import { formatTabDomain } from '$lib/utils/urlUtils';

export const nsfwTabCountStore = writable<number>(0);
export const socialTabCountStore = writable<number>(0);
export const duplicatedTabCountStore = writable<number>(0);

export async function getCountDuplicatedTabs(): Promise<number> {
	const tabs = await chrome.tabs.query({});
	const seenUrls = new Set();
	const duplicatedUrls = tabs.filter((tab) => seenUrls.size === seenUrls.add(tab.url).size);
	return duplicatedUrls.length;
}

export async function getCountNsfwTabs(): Promise<number> {
	let count: number = 0;
	const nsfwList = getNsfwList();

	const tabs = await chrome.tabs.query({});

	tabs.forEach((tab) => {
		const tabDomain = formatTabDomain(tab.url!);

		if (nsfwList.includes(tabDomain!)) {
			count += 1;
		}
	});

	return count;
}

export async function getCountSocialTabs(): Promise<number> {
	const socialList = getSocialList();
	const tabs = await chrome.tabs.query({});
	return tabs.reduce((count, tab) => {
		const tabDomain = formatTabDomain(tab.url!);
		return socialList.has(tabDomain) ? count + 1 : count;
	}, 0);
}
