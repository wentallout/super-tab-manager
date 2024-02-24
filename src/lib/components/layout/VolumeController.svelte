<script lang="ts">
	let volume: number;

	async function adjustVolume(event) {
		let tabs = await chrome.tabs.query({ active: true, currentWindow: true });

		if (tabs.length > 0) {
			chrome.tabs.sendMessage(tabs[0].id, { type: 'CHANGE_VOLUME', volume });
		} else {
			console.error('No active tab found to send message to.');
		}
	}
</script>

<input max="100" min="0" type="range" on:input={adjustVolume} bind:value={volume} />
