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
		<div class="domains">
			{#each $domainsStore as domain (domain.title)}
				<div class="domain__item" animate:flip={{ duration: 250, easing: quintOut }}>
					<DomainItem {domain} />
					<div class="btn-group">
						<button
							class="btn--small btn--outline"
							on:click={() => {
								groupTabsByOneDomain(domain.title);
							}}>
							<TabGroup height="24" width="24" />
							Group
						</button>

						<button
							class="btn--small btn--error"
							on:click={() => {
								closeTabsByDomain(domain.title);
							}}>
							<DeleteForever height="24" width="24" />
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
	.domains {
		display: flex;
		flex-direction: column;

		& .domain__item {
			border-radius: var(--border-radius-1);
			transition: 0.3s;

			gap: var(--space-m);
			width: 100%;

			display: grid;
			grid-template-columns: 1fr 192px;
		}
	}

	.btn-group {
		align-items: center;
		justify-self: end;
	}
</style>
