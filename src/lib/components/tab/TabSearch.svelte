<script lang="ts">
	import { searchTabs, tabListSearchResultStore } from '$stores/tabStore';

	import TabItemList from '$components/tab/TabItemList.svelte';
	import { Search } from '$lib/icons';

	let tabSearchInput: string;
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

<section class="search__section">
	{#if $tabListSearchResultStore.length > 0}
		<h3 class="search__heading">Search Result</h3>
		<div class="search__result">
			<TabItemList tabList={$tabListSearchResultStore} />
		</div>
	{/if}
</section>

<style>
	.search {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-2xs);
		margin-bottom: var(--space-m);
	}

	.search__heading {
		margin-top: var(--space-s);
		margin-bottom: var(--space-m);
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
</style>
