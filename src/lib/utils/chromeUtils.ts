import { toast } from 'svelte-sonner';

export async function getTabInfo(tabId: number) {
	const tabInfo = await chrome.tabs.get(tabId);
	return tabInfo;
}

export async function focusTabById(tabId: number | undefined) {
	if (!tabId) return;

	try {
		const tabInfo = await getTabInfo(tabId);

		if (tabInfo.windowId !== chrome.windows.WINDOW_ID_CURRENT) {
			await chrome.windows.update(tabInfo.windowId, { focused: true });
		}

		await chrome.tabs.update(tabId, { active: true, highlighted: true });
	} catch (error) {
		if (error instanceof Error) {
			toast.error(error.message);
		}
	}
}
