<script lang="ts">
	import {
		closeDuplicatedTabs,
		closeNsfwTabs,
		closeSocialTabs,
		groupTabsByAllDomains
	} from '$stores/tabStore';
	import { onMount } from 'svelte';

	import Badge from '$lib/components/badge/Badge.svelte';

	import { Recycling, Danger, SocialIcon, TabGroup } from '$lib/icons.ts';

	import {
		getCountDuplicatedTabs,
		duplicatedTabCountStore,
		nsfwTabCountStore,
		getCountNsfwTabs,
		socialTabCountStore,
		getCountSocialTabs
	} from '$stores/countStore';

	onMount(async () => {
		duplicatedTabCountStore.set(await getCountDuplicatedTabs());
		nsfwTabCountStore.set(await getCountNsfwTabs());
		socialTabCountStore.set(await getCountSocialTabs());
	});
</script>

<div class="group-wrapper">
	<div class="common-buttons">
		<button class="btn btn--primary" on:click={groupTabsByAllDomains}>
			<TabGroup height="24" width="24" />
			Group Tabs By Domain
		</button>
	</div>

	<div class="common-buttons">
		<button
			class="btn btn--error"
			disabled={$duplicatedTabCountStore === 0}
			on:click={closeDuplicatedTabs}>
			<Recycling height="24" width="24" />
			Close Duplicated
			<Badge count={$duplicatedTabCountStore} />
		</button>

		<button class="btn btn--error" disabled={$nsfwTabCountStore === 0} on:click={closeNsfwTabs}>
			<Danger height="24" width="24" />
			Close NSFW
			<Badge count={$nsfwTabCountStore} />
		</button>
		<button class="btn btn--error" disabled={$socialTabCountStore === 0} on:click={closeSocialTabs}>
			<SocialIcon />
			Close Social
			<Badge count={$socialTabCountStore} />
		</button>
	</div>
</div>

<style>
	.group-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.common-buttons {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--space-s);
		padding-inline: var(--space-xs);
	}
</style>
