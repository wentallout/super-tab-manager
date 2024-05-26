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
		height: fit-content;
		background-color: var(--error-content);
		border-radius: var(--border-radius-1);
		padding: 2px 4px;
	}

	.badge__counter {
		display: grid;
		place-items: center;
		color: #fff;
		font-size: var(--step--1);
		font-family: monospace;
		font-weight: 600;
		line-height: initial;
	}
</style>
