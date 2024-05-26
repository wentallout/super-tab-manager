<script lang="ts">
	import { focusTabById, getTabInfo } from '$lib/utils/chromeUtils';
	import { onMount } from 'svelte';

	import MemoryViewer from '$components/layout/MemoryViewer.svelte';
	import {
		bookmarkTabById,
		closeTabById,
		getIdOfCurrentTab,
		moveCurrentTabToIncognito
	} from '$stores/tabStore';
	import { Bookmark, Close } from '$lib/icons';
	import IncognitoIcon from '$lib/icons/IncognitoIcon.svelte';

	let currentId: number | undefined;
	let currentTabInfo: chrome.tabs.Tab;

	onMount(async () => {
		currentId = await getIdOfCurrentTab();

		if (currentId) {
			currentTabInfo = await getTabInfo(currentId);
		}
	});
</script>

<MemoryViewer />
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
				<p class="tab__title">
					{currentTabInfo.title}
				</p>
			</button>

			<div class="tab__btns">
				{#if currentTabInfo.id}
					<button class="btn--small" on:click={() => moveCurrentTabToIncognito()}>
						<IncognitoIcon />
					</button>
					<button class="btn--small" on:click={() => bookmarkTabById(currentTabInfo.id)}>
						<Bookmark height="24" width="24" />
					</button>
					<button class="btn--small" on:click={() => closeTabById(currentTabInfo.id)}>
						<Close height="24" width="24" />
					</button>
				{/if}
			</div>
		</div>
	{/if}
</section>

<style>
	.current {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		padding: 0 var(--space-s);
		border-bottom: 1px solid var(--border);
		margin-bottom: var(--space-s);
	}

	.tab__item {
		display: flex;
		flex-direction: row;
		font-size: var(--step--1);
		justify-content: space-between;

		border-radius: var(--border-radius-1);
		width: 100%;
		overflow: hidden;
	}

	.tab__title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 65ch;
	}

	.tab__title:hover {
		background-color: var(--background);
	}

	.tab__btns {
		display: flex;
		flex-direction: row;
		color: var(--copy);

		& .btn--small {
			color: var(--copy);

			&:hover {
				background-color: var(--foreground);
			}
		}
	}

	.tab__info {
		all: unset;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-2xs);
		color: var(--copy);
		flex-grow: 0;

		& .tab__favicon {
			flex-shrink: 0;
			flex-grow: 0;
			aspect-ratio: 1 / 1;
		}
	}
</style>
