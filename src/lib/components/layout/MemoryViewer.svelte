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
		<Memory height="16" width="16" />
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
		font-size: var(--step-0);
		display: flex;
		flex-direction: row;
		gap: var(--space-2xs);
		padding: var(--space-2xs) var(--space-s);
		border-bottom: 1px solid var(--border);

		position: fixed;
		bottom: 0;
		left: 0;
		z-index: var(--z-index-max);

		background-color: #00000070;
		transition: background-color 0.3s linear;

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
