<script lang="ts">
	import { memoryInfoStore } from '$stores/memoryInfoStore';
	import { convertBytesToMb } from '$lib/utils/numberUtils';
	import { Memory } from '$lib/icons';
	import { onMount } from 'svelte';
	import Loading from '$lib/icons/LoadingDots.svelte';
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
			{convertBytesToMb($memoryInfoStore.capacity) -
				convertBytesToMb($memoryInfoStore.availableCapacity)} MB /
			<strong>
				{convertBytesToMb($memoryInfoStore.capacity)} MB
			</strong>
		</div>
	{:else}
		<div>
			<Loading />
		</div>
	{/if}
</div>

<style>
	.memory {
		/* FLEX */
		display: flex;
		flex-direction: row;
		gap: var(--space-2xs);
		/* --- */

		padding: var(--space-2xs) var(--space-2xs);
		border-bottom: 1px solid var(--border);

		/* POSITION */
		position: fixed;
		bottom: 0;
		left: 0;
		/* --- */

		z-index: var(--z-index-max);
		font-size: var(--step--1);

		background-color: #00000070;
		transition: background-color 0.3s linear;
		pointer-events: none;

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
