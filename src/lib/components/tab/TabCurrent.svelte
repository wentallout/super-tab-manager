<script lang="ts">
	import { focusTabById, getTabInfo } from '$lib/utils/chromeUtils';
	import { onMount } from 'svelte';
	import TabButtons from '$components/tab/TabButtons.svelte';

	async function getIdOfCurrentTab() {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		return tab.id;
	}

	let currentId: number | undefined;
	let currentTabInfo: chrome.tabs.Tab;

	onMount(async () => {
		currentId = await getIdOfCurrentTab();

		if (currentId) {
			currentTabInfo = await getTabInfo(currentId);
		}
	});
</script>

<section class="current g-pad">
	{#if currentTabInfo}
		<h3>Current Tab</h3>
		<div class="tab__item">
			<button class="tab__info" on:click={() => focusTabById(currentTabInfo.id)}>
				<img
					class="tab__favicon"
					alt="favicon"
					height="16px"
					src={currentTabInfo.favIconUrl}
					width="16px" />
				<p class="tab__title">
					{currentTabInfo.title}
				</p>
			</button>

			<TabButtons tab={currentTabInfo} />
		</div>
	{/if}
</section>

<style>
	.current {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
	}

	.tab__item {
		display: flex;
		flex-direction: row;
		font-size: var(--step--1);
		border: 1px solid var(--primary);
		border-radius: var(--border-radius-1);
		width: 100%;
		overflow: hidden;
	}

	.tab__title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: ease-out 0.3s;
	}

	.tab__title:hover {
		overflow: visible;
		white-space: normal;
		word-break: break-all;
		z-index: 1;
		background-color: var(--background);
		width: 100%;
	}

	.tab__info {
		all: unset;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-2xs) var(--space-xs);
		color: var(--copy);
		flex-grow: 0;
		min-width: 65ch;
		border-right: 1px solid var(--border);

		& .tab__favicon {
			flex-shrink: 0;
			flex-grow: 0;
			aspect-ratio: 1 / 1;
		}
	}
</style>
