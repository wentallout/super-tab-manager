<script lang="ts">
	import { onMount } from 'svelte';

	import { tabListStore, getAllTabs } from '$lib/stores/tabStore';

	import TabItemList from './TabItemList.svelte';

	onMount(() => {
		getAllTabs();
	});

	export let searchInput: string;
</script>

{#if searchInput.length === 0}
	<div class="tab">
		{#if $tabListStore}
			<TabItemList tabList={$tabListStore} />
		{:else}
			<div>No tab found</div>
		{/if}
	</div>
{/if}

<style>
	.tab {
		--min: 30ch;
		--gap: var(--space-xs);
		display: grid;
		grid-gap: var(--gap);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));

		& .tab__item {
			display: flex;
			flex-direction: column;
			font-size: var(--step--1);
			border: 1px solid var(--border);
			border-radius: var(--border-radius-1);
			width: 100%;
			overflow: hidden;
		}
	}
</style>
