<script lang="ts">
	import { page } from '$app/stores';
	// import { openOptionsPage } from '$lib/utils/chromeUtils';

	import { Globe, Tab } from '$lib/icons.ts';
	import TabCurrent from '$components/tab/TabCurrent.svelte';
	import { tabListStore } from '$stores/tabStore';
</script>

<header>
	<nav>
		<div class="nav">
			<div class="nav__item">
				<a
					class="nav__link"
					class:active={$page.url.pathname === '/' || $page.url.pathname === '/index.html'}
					href="/">
					<Tab height="24" width="24" />
					Tabs ({$tabListStore.length})
				</a>
			</div>
			<div class="nav__item">
				<a class="nav__link" class:active={$page.url.pathname === '/domains'} href="/domains">
					<Globe height="24" width="24" />
					Domains
				</a>
			</div>
		</div>
	</nav>
</header>
<TabCurrent />

<style>
	header {
		width: 100%;
		font-size: var(--step-1);
		position: sticky;
		top: 0;
		left: 0;
		z-index: var(--z-index-max);
		background-color: var(--background);
	}

	.nav {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		& .nav__item {
			flex-grow: 1;

			& .nav__link {
				/* flex stuff */
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: row;
				gap: var(--space-2xs);
				/*  */

				/* text */
				text-decoration: none;
				color: var(--copy-lighter);
				/*  */

				padding: var(--space-2xs) var(--space-xs);
				flex-grow: 1;
				transition: all ease 0.3s;

				border-bottom: 1px solid var(--border);

				border-bottom-right-radius: var(--border-radius-3);
				border-bottom-left-radius: var(--border-radius-3);

				&:hover {
					color: var(--primary-light);
					background-color: var(--foreground);
				}

				&.active {
					border-bottom: 1px solid var(--primary);
					color: var(--primary);
					font-weight: 600;
				}
			}
		}
	}
</style>
