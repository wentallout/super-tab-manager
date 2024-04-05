<script lang="ts">
	import { focusTabById } from '$lib/utils/chromeUtils';

	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import TabButtons from '$components/tab/TabButtons.svelte';

	import { pinTabById, unpinTabById } from '$stores/tabStore';
	import { Keep, KeepOff } from '$lib/icons';
	export let tabList: chrome.tabs.Tab[];

	$: tabList;
</script>

{#each tabList as tab (tab.id)}
	<div
		class="tab__item"
		class:tab--pinned={tab.pinned}
		animate:flip={{ duration: 250, easing: quintOut }}>
		<button class="tab__info" on:click={() => focusTabById(tab.id)}>
			<img class="tab__favicon" alt="favicon" height="16px" src={tab.favIconUrl} width="16px" />
			<p class="tab__select truncate">
				{tab.title}
			</p>
		</button>

		{#if !tab.pinned}
			<button class="tab__pin" on:click={() => pinTabById(tab.id)}>
				<Keep height="24" width="24" />
			</button>
		{:else}
			<button class="tab__pin" on:click={() => unpinTabById(tab.id)}>
				<KeepOff height="24" width="24" />
			</button>
		{/if}

		<TabButtons {tab} />
	</div>
{/each}

<style>
	.tab--pinned {
		border-color: var(--secondary) !important;
		font-weight: 600;
	}

	.tab__item {
		display: flex;
		flex-direction: column;
		font-size: var(--step--1);
		border: 1px solid var(--border);
		border-radius: var(--border-radius-1);
		width: 100%;
		overflow: hidden;
		position: relative;
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

	.tab__pin {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 99;
		background-color: var(--background);
		padding: 4px;
		border-radius: 100%;
		display: none;
		opacity: 0;
		transition: opacity 0.3s linear;
		transition: all linear 0.3s;

		&:hover {
			filter: brightness(1.2);
		}
	}

	.tab__item:hover .tab__pin {
		display: block;
		opacity: 1;
		filter: brightness(1.2);
	}
</style>
