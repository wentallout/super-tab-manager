import { writable } from 'svelte/store';

import { domainsStore } from '$stores/domainStore';

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
export const duplicatedTabsStore = writable<chrome.tabs.Tab[]>([]);

export async function ungroupAllTabs() {
	const groups = await chrome.tabGroups.query({});
	const groupIds = groups.map((group) => group.id);

	const tabs = await chrome.tabs.query({});
	const groupedTabs = tabs.filter((tab) => groupIds.includes(tab.groupId));

	for (const tab of groupedTabs) {
		if (tab.id !== undefined) {
			try {
				chrome.tabs.ungroup(tab.id);
			} catch (error) {
				console.error(`Failed to ungroup tab ${tab.id}: ${error}`);
			}
		}
	}
}

export async function getAllTabs() {
	const tabs = await chrome.tabs.query({});
	tabListStore.set(tabs);
	setDuplicatedTabsStore(tabs);
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
		toast.error(`No tabs found for domain: ${domain}`);
		throw new Error(`No tabs found for domain: ${domain}`);
	}

	const formattedDomain = domain.replace(/^www\./, '');

	chrome.tabs.group({ tabIds }).then((groupId) => {
		chrome.tabGroups.update(groupId, { title: formattedDomain, collapsed: true });
	});

	toast.success(`Grouped ${domain} tab.`);
	tabListStore.set(tabs);
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

export async function closeTabById(tabId: number) {
	const tab = await getTabInfo(tabId);
	chrome.tabs.remove(tabId, async () => {
		tabListStore.update((tabs) => tabs.filter((tab) => tab.id !== tabId));
		tabListSearchResultStore.update((tabs) => tabs.filter((tab) => tab.id !== tabId));
	});
	toast.success(`Closed tab`, {
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
	if (!input) {
		tabListSearchResultStore.set([]);
		return;
	}

	const lowerCaseInput = input.toLowerCase();
	const allTabs = await chrome.tabs.query({});
	const filteredTabs = allTabs.filter(
		(tab) =>
			tab.title?.toLowerCase().includes(lowerCaseInput) ||
			tab.url?.toLowerCase().includes(lowerCaseInput)
	);

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
		try {
			const url = new URL(tab.url!);
			const hostname = url.hostname;
			domainsMap.set(hostname, (domainsMap.get(hostname) || 0) + 1);
		} catch (error) {
			console.error(`Invalid URL: ${tab.url}`);
		}
	});

	const uniqueDomains = Array.from(domainsMap.entries())
		.filter(([_, value]) => value > 1)
		.map(([key, value]) => {
			return { title: key, numOfAppearance: value };
		});

	for (const domain of uniqueDomains) {
		await groupTabsByOneDomain(domain.title);
	}

	// Get all tabs that are not in any group
	const ungroupedTabs = await chrome.tabs.query({ groupId: -1 });

	// If there are ungrouped tabs, create a new group called "Others"
	if (ungroupedTabs.length > 0) {
		const othersGroupId = await chrome.tabs.group({ tabIds: ungroupedTabs.map((tab) => tab.id) });
		await chrome.tabGroups.update(othersGroupId, { title: 'Others', collapsed: true });
	}
}

export async function pinTabById(tabId: number | undefined): Promise<void> {
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

export async function setDuplicatedTabsStore(tabs: chrome.tabs.Tab[]) {
	const tabTitlesMap = new Map<string, number>();

	tabs.forEach((tab) => {
		const title = tab.title;
		if (title) {
			tabTitlesMap.set(title, (tabTitlesMap.get(title) || 0) + 1);
		}
	});

	const duplicatedTabTitles = Array.from(tabTitlesMap.entries())
		.filter(([_, count]) => count > 1)
		.map(([title]) => title);

	const duplicatedTabs = tabs.filter((tab) => duplicatedTabTitles.includes(tab.title!));
	duplicatedTabsStore.set(duplicatedTabs);
}

export async function getIdOfCurrentTab() {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	return tab.id;
}

export async function moveCurrentTabToIncognito() {
	const currentId = await getIdOfCurrentTab();
	let currentTabInfo;

	if (currentId) {
		currentTabInfo = await getTabInfo(currentId);
	}

	if (currentTabInfo) {
		chrome.windows.create({
			url: currentTabInfo.url,
			incognito: true,
			focused: true,
			state: 'maximized'
		});
		// chrome.tabs.remove(currentTab.id);
	}
}
