<script lang="ts">
	import { memoryInfoStore } from '$stores/memoryInfoStore';

	import { Memory } from '$lib/icons';
	import { onMount } from 'svelte';
	import LoadingDots from '$lib/icons/LoadingDots.svelte';
	import { fade } from 'svelte/transition';

	function getMemoryUsage(): void {
		setInterval(() => {
			chrome.system.memory.getInfo((memoryInfo) => {
				memoryInfoStore.set(memoryInfo);
			});
		}, 1000);
	}

	onMount(() => {
		getMemoryUsage();
	});
</script>

<div class="memory">
	<div class="memory__title">
		<Memory />
	</div>
	{#if $memoryInfoStore}
		<div class="memory__value" transition:fade>
			{(
				(($memoryInfoStore.capacity - $memoryInfoStore.availableCapacity) /
					$memoryInfoStore.capacity) *
				100
			).toFixed(2)}%
		</div>
	{:else}
		<div>
			<LoadingDots />
		</div>
	{/if}
</div>

<style>
	.memory {
		/* FLEX */
		display: flex;
		flex-direction: row;
		gap: 4px;
		/* --- */

		z-index: var(--z-index-max);
		font-size: var(--step--1);

		transition: background-color 0.3s linear;
		pointer-events: none;

		border-radius: var(--border-radius-1);

		& .memory__title {
			display: flex;
			flex-direction: row;
			gap: var(--space-2xs);
			align-items: center;
		}

		&:hover {
			background-color: #000;
		}
	}

	.memory__value {
		font-family: monospace;
	}
</style>
