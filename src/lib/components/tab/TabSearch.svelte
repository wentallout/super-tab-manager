<script lang="ts">
	import { searchTabs, tabListSearchResultStore } from '$stores/tabStore';

	import TabItemList from '$components/tab/TabItemList.svelte';
	import { Search } from '$lib/icons';

	import TabAll from '$components/tab/TabAll.svelte';

	let tabSearchInput: string = '';

	import { slide, fade } from 'svelte/transition';
</script>

<section>
	<div class="search">
		<Search height="24" width="24" />
		<input
			class="search__input"
			placeholder="search tab..."
			spellcheck="false"
			type="text"
			bind:value={tabSearchInput}
			on:input={() => searchTabs(tabSearchInput)} />
	</div>
</section>

{#if tabSearchInput}
	<section class="search__section" transition:slide={{ duration: 300, axis: 'y' }}>
		<h3 class="search__heading">Search Result</h3>
		{#if $tabListSearchResultStore.length > 0}
			<div class="search__result" transition:fade>
				<TabItemList tabList={$tabListSearchResultStore} />
			</div>
		{:else}
			<p>No tabs with that title</p>
		{/if}
	</section>
{/if}

<TabAll searchInput={tabSearchInput} />

<style>
	.search__section {
	}

	.search {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-2xs);
		margin-bottom: var(--space-m);
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
		grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), var(--min)));
		overflow: hidden;
	}

	.search__input {
		width: 100%;
	}
</style>
