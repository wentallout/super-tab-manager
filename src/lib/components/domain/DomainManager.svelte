<script lang="ts">
	import DomainItem from '$lib/components/domain/DomainItem.svelte';
	import { groupTabsByOneDomain, closeTabsByDomain } from '$lib/stores/tabStore';

	import { domainsStore, getAllDomains } from '$lib/stores/domainStore';
	import { onMount } from 'svelte';

	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { TabGroup, DeleteForever } from '$lib/icons';

	onMount(async () => {
		await getAllDomains();
	});
</script>

<section>
	{#if $domainsStore.length > 0}
		<div class="domain">
			{#each $domainsStore as domain (domain.title)}
				<div class="domain__item" animate:flip={{ duration: 250, easing: quintOut }}>
					<DomainItem {domain} />
					<div class="btn-group">
						<button
							class="btn--small btn--outline"
							on:click={() => {
								groupTabsByOneDomain(domain.title);
							}}>
							<TabGroup />
							Group
						</button>

						<button
							class="btn--small btn--error"
							on:click={() => {
								closeTabsByDomain(domain.title);
							}}>
							<DeleteForever />
							Close
						</button>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="">nothing</div>
	{/if}
</section>

<style>
	.domain {
		display: flex;
		flex-direction: column;
		gap: var(--space-m);

		& .domain__item {
			border-radius: var(--border-radius-1);
			transition: 0.3s;
			display: flex;
			flex-direction: row;
			gap: var(--space-m);
			width: 100%;
		}
	}

	.btn-group {
		margin-left: auto;
	}
</style>
