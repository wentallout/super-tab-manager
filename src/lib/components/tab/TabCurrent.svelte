<script lang="ts">
	import { focusTabById, getTabInfo } from '$lib/utils/chromeUtils';
	import { onMount } from 'svelte';
	import TabButtons from '$components/tab/TabButtons.svelte';

	async function getIdOfCurrentTab() {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		return tab.id;
	}

	let currentId: number;
	let currentTabInfo: chrome.tabs.Tab;

	onMount(async () => {
		currentId = await getIdOfCurrentTab();
		currentTabInfo = await getTabInfo(currentId);
	});
</script>

<section class="current">
	{#if currentTabInfo}
		<div class="tab__item">
			<button class="tab__info" on:click={() => focusTabById(currentTabInfo.id)}>
				<img
					class="tab__favicon"
					alt="favicon"
					height="16px"
					src={currentTabInfo.favIconUrl}
					width="16px" />
				<p class="tab__select">
					{currentTabInfo.title}
				</p>
			</button>

			<TabButtons tab={currentTabInfo} />
		</div>
	{/if}
</section>

<style>
	.current {
		margin-bottom: var(--space-m);
		display: flex;
		flex-direction: row;
		gap: var(--space-m);
	}

	.tab__item {
		display: flex;
		flex-direction: column;
		font-size: var(--step--1);
		border: 1px solid var(--primary);
		border-radius: var(--border-radius-1);
		width: 100%;
		overflow: hidden;
	}

	.tab__info {
		all: unset;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-2xs) var(--space-xs);

		flex-grow: 1;
		background-color: var(--primary);
		color: black;

		& .tab__favicon {
			aspect-ratio: 1 / 1;
		}
	}
</style>
