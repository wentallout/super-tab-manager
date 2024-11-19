import { toast } from 'svelte-sonner';

export function togglePictureInPicture() {
	// Find all tabs in the current window
	chrome.tabs.query({ currentWindow: true }, async (tabs) => {
		for (const tab of tabs) {
			if (tab.id) {
				try {
					// Execute a script in each tab to find and toggle PiP for the playing video/audio
					const result = await chrome.scripting.executeScript({
						target: { tabId: tab.id },
						func: () => {
							const media = document.querySelector('video, audio');
							if (media && !media.paused) {
								if (document.pictureInPictureElement) {
									document.exitPictureInPicture();
									return { action: 'exited' };
								} else if ('requestPictureInPicture' in media && media.readyState >= 2) {
									(media as HTMLVideoElement).requestPictureInPicture();
									return { action: 'entered' };
								}
							}
							return null;
						}
					});

					if (result[0]?.result) {
						// PiP was toggled, we can stop searching
						return;
					}
				} catch (error) {
					toast.error(`Failed to toggle Picture-in-Picture in tab ${tab.id}: ${error}`);
				}
			}
		}
		toast.error('No playing media found to toggle Picture-in-Picture');
	});
}
