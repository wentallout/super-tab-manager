<script lang="ts">
	import { searchTabs, tabListSearchResultStore } from '$stores/tabStore';

	import TabItemList from '$components/tab/TabItemList.svelte';
	import { Search } from '$lib/icons';

	import TabAll from '$components/tab/TabAll.svelte';

	let tabSearchInput: string = '';

	import { fade } from 'svelte/transition';
</script>

<section>
	<div class="search">
		<Search style="margin-left:8px" height="24" width="24" />
		<input
			class="search__input"
			placeholder="Search tabs"
			spellcheck="false"
			type="search"
			bind:value={tabSearchInput}
			on:input={() => searchTabs(tabSearchInput)} />
	</div>
</section>

{#if tabSearchInput}
	<section class="search__section">
		<h3 class="search__heading">Search Result</h3>
		{#if $tabListSearchResultStore.length > 0}
			<div class="search__result" in:fade>
				<TabItemList tabList={$tabListSearchResultStore} />
			</div>
		{:else}
			<p class="notab">No tabs with that title</p>
		{/if}
	</section>
{/if}

<TabAll searchInput={tabSearchInput} />

<style>
	.search {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-2xs);
		margin-bottom: var(--space-m);
		border: 1px solid var(--border);
		border-radius: var(--border-radius-3);
	}

	.search__heading {
		margin-bottom: var(--space-m);
		color: var(--copy-light);
	}

	.search__result {
		--min: 30ch;
		--gap: var(--space-xs);
		display: grid;
		grid-gap: var(--gap);

		grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
		overflow: hidden;
	}

	.search__input {
		width: 100%;
	}

	.notab {
		font-size: var(--step-0);
		color: var(--copy-light);
	}
</style>
