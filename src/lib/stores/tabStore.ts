import { writable } from 'svelte/store';

import { domainsStore } from '$stores/domainStore';
import { getFaviconByUrl } from '$lib/utils/faviconUtils';
import { toast } from 'svelte-sonner';
import {
	getCountNsfwTabs,
	duplicatedTabCountStore,
	nsfwTabCountStore,
	socialTabCountStore
} from '$stores/countStore';
import { getNsfwList, getSocialList } from '$stores/filterListStore';
import { getTabInfo } from '$lib/utils/chromeUtils';

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
		if (uniqueUrls.has(tab.url)) {
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
	try {
		const tabs: chrome.tabs.Tab[] = await chrome.tabs.query({});

		//find all tabs with the domain
		const tabsToGroup = tabs.filter((tab) => tab.url?.includes(domain));

		//get tabIds as array number[]
		const tabIds: number[] = tabsToGroup.map((tab) => tab.id as number);

		// Group the tabs
		const groupId = await chrome.tabs.group({ tabIds });

		// Update the group with a title
		await chrome.tabGroups.update(groupId, { title: domain, collapsed: true });

		toast.success(`Grouped ${domain} tab.`);
		tabListStore.set(tabs);
	} catch (error) {
		toast.error('Grouped tabs failed.');
	}
}

export async function closeTabsByDomain(domain: string) {
	let closeCount = 0;

	const tabs = await chrome.tabs.query({});

	for (const tab of tabs) {
		const tabDomain = new URL(tab.url!).hostname;
		if (tabDomain.includes(domain)) {
			closeTabById(tab.id as number);
			closeCount++;
		}
	}
	domainsStore.update((domains) => domains.filter((d) => !d.title.includes(domain)));
	toast.success(`Closed ${closeCount} ${domain} tab(s)`);
}

/**
 * Closes a tab by its ID.
 * @param {number} tabId - The ID of the tab to close.
 * @returns {Promise<void>} - A promise that resolves once the tab is closed.
 */
export async function closeTabById(tabId: number) {
	const tab = await getTabInfo(tabId);
	chrome.tabs.remove(tabId, async () => {
		tabListStore.update((tabs) => tabs.filter((tab) => tab.id !== tabId));
		tabListSearchResultStore.update((tabs) => tabs.filter((tab) => tab.id !== tabId));
	});
	toast.success(`Closed tab.`, {
		description: `${tab.title}`
	});
}

export async function bookmarkTabById(tabId: number) {
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
	const allTabs = await chrome.tabs.query({});

	if (input.length !== 0) {
		const filteredTabs = allTabs.filter((tab) =>
			tab.title?.toLowerCase().includes(input.toLowerCase())
		);
		tabListSearchResultStore.set(filteredTabs);
	} else {
		tabListSearchResultStore.set([]);
	}
}

export async function closeNsfwTabs() {
	const nsfwList = getNsfwList();
	const tabs = await chrome.tabs.query({});

	for (const tab of tabs) {
		const tabDomain = new URL(tab.url ?? '').hostname;
		if (nsfwList.includes(tabDomain)) {
			chrome.tabs.remove(tab.id as number);
		}
	}
	toast.success('Closed all NSFW tabs.');
	nsfwTabCountStore.set(await getCountNsfwTabs());
}

export async function closeSocialTabs(): Promise<void> {
	const socialList = getSocialList();
	const tabs = await chrome.tabs.query({});

	for (const tab of tabs) {
		const tabDomain = new URL(tab.url ?? '').hostname;
		if (socialList.includes(tabDomain)) {
			chrome.tabs.remove(tab.id as number);
		}
	}
	toast.success('Closed all social tabs.');
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
		toast.success(`Grouped all tabs.`);
	});
}
