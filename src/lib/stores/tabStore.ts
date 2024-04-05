import { writable } from 'svelte/store';

import { domainsStore } from '$stores/domainStore';
import { getFaviconByUrl } from '$lib/utils/faviconUtils';
import { toast } from 'svelte-sonner';
import {
	duplicatedTabCountStore,
	getCountNsfwTabs,
	nsfwTabCountStore,
	socialTabCountStore
} from '$stores/countStore';
import { getNsfwList, getSocialList } from '$stores/filterListStore';
import { getTabInfo } from '$lib/utils/chromeUtils';
import { formatTabDomain } from '$lib/utils/urlUtils';

export const tabListStore = writable<chrome.tabs.Tab[]>([]);
export const tabListSearchResultStore = writable<chrome.tabs.Tab[]>([]);

export async function getAllTabs() {
	const tabs = await chrome.tabs.query({});
	tabListStore.set(tabs);
}

export async function closeDuplicatedTabs() {
	const tabs = await chrome.tabs.query({});
	const uniqueUrls = new Set<string>();

	tabs.forEach(async (tab) => {
		if (uniqueUrls.has(tab.url!)) {
			// chrome.tabs.remove(tab.id as number);
			closeTabById(tab.id as number);
		} else {
			tab.url && uniqueUrls.add(tab.url);
		}
	});
	getAllTabs();
	toast.success('Closed duplicated tabs.');
	duplicatedTabCountStore.set(0);
}

export async function groupTabsByOneDomain(domain: string) {
	if (!domain) {
		throw new Error('Domain cannot be empty');
	}

	try {
		const tabs: chrome.tabs.Tab[] = await chrome.tabs.query({});

		if (!tabs.length) {
			throw new Error('No tabs found');
		}

		const tabIds = tabs.reduce((result, tab) => {
			if (tab.url?.includes(domain)) {
				result.push(tab.id as number);
			}
			return result;
		}, [] as number[]);

		if (!tabIds.length) {
			throw new Error(`No tabs found for domain: ${domain}`);
		}

		const groupId = await chrome.tabs.group({ tabIds });
		await chrome.tabGroups.update(groupId, { title: domain, collapsed: true });

		toast.success(`Grouped ${domain} tab.`);
		tabListStore.set(tabs);
	} catch (error) {
		toast.error(`Grouping tabs failed`);
	}
}

export async function closeTabsByDomain(domain: string) {
	const tabs = await chrome.tabs.query({});

	for (const tab of tabs) {
		const tabDomain = new URL(tab.url!).hostname;
		if (tabDomain.includes(domain)) {
			closeTabById(tab.id as number);
		}
	}
	domainsStore.update((domains) => domains.filter((d) => !d.title.includes(domain)));
}

/**
 * Closes a tab by its ID.
 * @param {number} tabId - The ID of the tab to close.
 * @returns {Promise<void>} - A promise that resolves once the tab is closed.
 */
export async function closeTabById(tabId: number | undefined) {
	const tab = await getTabInfo(tabId);
	chrome.tabs.remove(tabId, async () => {
		tabListStore.update((tabs) => tabs.filter((tab) => tab.id !== tabId));
		tabListSearchResultStore.update((tabs) => tabs.filter((tab) => tab.id !== tabId));
	});
	toast.success(`Closed tab.`, {
		description: `${tab.title}`
	});
}

export async function bookmarkTabById(tabId: number | undefined) {
	try {
		const tabInfo = await getTabInfo(tabId);

		await chrome.bookmarks.create({
			title: tabInfo.title,
			url: tabInfo.url,
			index: 0,
			parentId: undefined
		});

		toast.success(`Bookmarked tab.`, {
			description: `${tabInfo.title}`
		});
	} catch (error) {
		toast.error(`Bookmarked failed`);
	}
}

export async function searchTabs(input: string) {
	if (!input) {
		tabListSearchResultStore.set([]);
		return;
	}

	const lowerCaseInput = input.toLowerCase();
	const allTabs = await chrome.tabs.query({});
	const filteredTabs = allTabs.filter((tab) => tab.title?.toLowerCase().includes(lowerCaseInput));

	tabListSearchResultStore.set(filteredTabs);
}

export async function closeNsfwTabs() {
	try {
		const nsfwList = getNsfwList();
		const tabs = await chrome.tabs.query({});

		const closeTabPromises = tabs
			.filter((tab) => tab.url && nsfwList.includes(formatTabDomain(tab.url)))
			.map((tab) => tab.id && chrome.tabs.remove(tab.id));

		await Promise.all(closeTabPromises);

		toast.success('Closed all NSFW tabs.');
		// nsfwTabCountStore.set(0);

		const newCount = await getCountNsfwTabs();
		nsfwTabCountStore.update((n) => {
			return newCount;
		});
	} catch (error) {
		toast.error('Error closing NSFW tabs. Please try again.');
	}
}

export async function closeSocialTabs(): Promise<void> {
	const socialList = getSocialList();
	const tabs = await chrome.tabs.query({});

	const socialTabs = tabs.filter((tab) => {
		const tabDomain = formatTabDomain(tab.url!);
		return socialList.has(tabDomain);
	});

	const socialTabIds = socialTabs.map((tab) => tab.id!).filter((id) => id !== undefined);

	if (socialTabIds.length > 0) {
		await chrome.tabs.remove(socialTabIds);
	}
	socialTabCountStore.set(0);
}

export async function groupTabsByAllDomains() {
	const tabs = await chrome.tabs.query({});

	const domainsMap = new Map<string, number>();
	tabs.forEach((tab) => {
		const url = new URL(tab.url!);
		const hostname = url.hostname;
		domainsMap.set(hostname, (domainsMap.get(hostname) || 0) + 1);
	});

	const uniqueDomains = Array.from(domainsMap.entries())
		.filter(([_, value]) => value > 1)
		.map(async ([key, value]) => {
			const favicon = await getFaviconByUrl(`https://${key}`);
			return { title: key, numOfAppearance: value, favicon };
		});
	const resolvedUniqueDomains = await Promise.all(uniqueDomains);

	resolvedUniqueDomains.forEach((domain) => {
		groupTabsByOneDomain(domain.title);
	});
}

export async function pinTabById(tabId: number | undefined) {
	if (tabId) {
		try {
			await chrome.tabs.update(tabId, { pinned: true });
			toast.success(`Pinned tab.`);
			getAllTabs();
		} catch (error) {
			toast.error(`Error pinning tab. Please try again.`);
		}
	}
}

export async function unpinTabById(tabId: number | undefined) {
	if (tabId) {
		try {
			await chrome.tabs.update(tabId, { pinned: false });
			toast.success(`Unpinned tab.`);
			getAllTabs();
		} catch (error) {
			toast.error(`Error unpinning`);
		}
	}
}
