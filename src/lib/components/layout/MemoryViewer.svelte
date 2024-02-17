<script lang="ts">
	import { memoryInfoStore } from '$stores/memoryInfoStore';
	import { convertBytesToMb } from '$lib/utils/numberUtils';
	import { Memory } from '$lib/icons';
	import { onMount } from 'svelte';

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
		Memory
	</div>
	{#if $memoryInfoStore}
		<span>
			{convertBytesToMb($memoryInfoStore.capacity) -
				convertBytesToMb($memoryInfoStore.availableCapacity)} MB
		</span>
		<span>/</span>
		<span>
			<strong>
				{convertBytesToMb($memoryInfoStore.capacity)} MB
			</strong>
		</span>
	{:else}
		<div>?</div>
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

		& .memory__title {
			display: flex;
			flex-direction: row;
			gap: var(--space-2xs);
			align-items: center;
		}
	}
</style>
