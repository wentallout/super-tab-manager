<script lang="ts">
	import { page } from '$app/stores';
	import { openOptionsPage } from '$lib/utils/chromeUtils';

	import MemoryViewer from '$components/layout/MemoryViewer.svelte';
	import { Globe, Tab } from '$lib/icons.ts';
</script>

<div class="g-pad">
	<button on:click={() => openOptionsPage()}>Options</button>
</div>

<header>
	<nav>
		<ul class="nav">
			<li class="nav__item">
				<a
					class="nav__link"
					class:active={$page.url.pathname === '/' || $page.url.pathname === '/index.html'}
					href="/">
					<Tab height="24" width="24" />
					<p>Tabs</p>
				</a>
			</li>
			<li class="nav__item">
				<a class="nav__link" class:active={$page.url.pathname === '/domains'} href="/domains">
					<Globe height="24" width="24" />
					<p>Domains</p>
				</a>
			</li>
		</ul>
	</nav>
</header>

<MemoryViewer />

<style>
	header {
		width: 100%;
		background-color: var(--background);
		background-image: url('https://transparenttextures.com/patterns/inflicted.png');
		font-size: var(--step-1);
		position: sticky;
		top: 0;
		left: 0;
		z-index: 9999;
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

				&:hover {
					color: var(--primary-light);
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
