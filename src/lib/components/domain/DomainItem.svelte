<script lang="ts">
	import type { Domain } from '$lib/types/Domain';
	import { navigateToFirstTabOfDomain } from '$stores/domainStore';
	export let domain: Domain;
</script>

<button class="domain" on:click={() => navigateToFirstTabOfDomain(domain.title)}>
	<img class="domain__favicon" alt="favicon" src={domain.favicon} />

	<button class="domain__info">
		<h5 class="domain__title truncate">
			{domain.title}
		</h5>
		<p class="domain__sub">{domain.numOfAppearance} tabs</p>
	</button>
</button>

<style>
	.domain {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		height: 32px;
		gap: var(--space-xs);
		flex-grow: 1;
		padding-block: var(--space-xs);

		& .domain__favicon {
			aspect-ratio: 1;
			height: 100%;
			width: auto;
		}

		&:hover {
			background-color: var(--foreground);
			cursor: pointer;
		}
	}

	.domain__title {
		font-size: var(--step-0);
		font-weight: 600;
		height: fit-content;
		color: var(--copy);
	}

	.domain__sub {
		font-size: var(--step--1);
		color: var(--copy-light);
	}

	.domain__info {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		max-width: 460px;
		overflow: hidden;
	}

	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
