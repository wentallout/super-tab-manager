<script lang="ts">
	import { focusTabById } from '$lib/utils/chromeUtils';

	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import TabButtons from '$components/tab/TabButtons.svelte';
	export let tabList: chrome.tabs.Tab[];
</script>

{#each tabList as tab (tab.id)}
	<div class="tab__item" animate:flip={{ duration: 250, easing: quintOut }}>
		<button class="tab__info" on:click={() => focusTabById(tab.id)}>
			<img class="tab__favicon" alt="favicon" height="16px" src={tab.favIconUrl} width="16px" />
			<p class="tab__select truncate">
				{tab.title}
			</p>
		</button>

		<TabButtons {tab} />
	</div>
{/each}

<style>
	.tab__item {
		display: flex;
		flex-direction: column;
		font-size: var(--step--1);
		border: 1px solid var(--border);
		border-radius: var(--border-radius-1);
		width: 100%;
		overflow: hidden;
	}

	.tab__favicon {
		width: 16px;
		height: 16px;
		aspect-ratio: 1/1;
		flex-shrink: 0;
		flex-grow: 0;
	}

	.tab__info {
		all: unset;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-2xs) var(--space-xs);
		cursor: pointer;
		flex-grow: 1;

		&:hover {
			outline: 1px solid var(--primary);
			background-color: var(--foreground);
		}

		& .tab__favicon {
			aspect-ratio: 1 / 1;
		}
	}
</style>
