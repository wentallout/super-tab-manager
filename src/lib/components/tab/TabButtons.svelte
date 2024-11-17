<script lang="ts">
	import { Close, Bookmark } from '$lib/icons';
	import { closeTabById, bookmarkTabById } from '$stores/tabStore';
	import { slide } from 'svelte/transition';
	export let tab: chrome.tabs.Tab;
</script>

<div transition:slide class="tab__btn-group">
	<button class="btn--small btn--bookmark" on:click={() => bookmarkTabById(tab.id)}>
		<Bookmark height="24" width="24" />
	</button>

	<button class="btn--small btn--error" on:click={() => closeTabById(tab.id)}>
		<Close height="24" width="24" />
	</button>
</div>

<style>
	.tab__btn-group {
		width: 100%;
		margin-top: auto;

		display: grid;
		grid-template-columns: 1fr 1fr;

		border-top: 1px solid var(--border);
		overflow: hidden;

		& .btn--small:last-child {
			border-right: 0;
		}
	}

	.btn--small {
		border-radius: 0;
		border: 0;
		border-right: 1px solid var(--border);
		flex-grow: 1;
	}

	.btn--bookmark {
		background-color: transparent;
		color: var(--success);

		&:hover {
			background-color: var(--success);
			color: black;
		}
	}
</style>
