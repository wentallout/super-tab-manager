<script lang="ts">
	export let count: number;

	$: count;
</script>

{#if count > 0}
	<div class="badge">
		<div class="badge__counter">
			{count}
		</div>
	</div>
{/if}

<style>
	.badge {
		position: absolute;
		top: 0;
		right: 0;

		height: 16px;
		background-color: var(--error-content);
		border-radius: var(--border-radius-1);
		padding: 1px 3px;
		aspect-ratio: 1/1;
	}

	.badge__counter {
		display: grid;
		place-items: center;
		color: #fff;
		font-size: var(--step--1);
		font-family: monospace;
		font-weight: 400;
	}
</style>
