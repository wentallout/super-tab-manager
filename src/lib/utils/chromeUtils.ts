import { memoryInfoStore } from '$lib/stores/memoryInfoStore';
import { toast } from 'svelte-sonner';

export async function getTabInfo(tabId: number) {
	const tabInfo = await chrome.tabs.get(tabId);
	return tabInfo;
}

export async function focusTabById(tabId: number) {
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



export async function openOptionsPage() {
	try {
		await chrome.runtime.openOptionsPage();
	} catch (error) {
		console.error('Error opening options page:', error.message);
		// Handle the error, e.g., display a message to the user
	}
}
