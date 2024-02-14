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

<div class="common-buttons g-pad">
	<button class="btn btn--primary" on:click={groupTabsByAllDomains}>
		<TabGroup />
		Group Tabs By Domain
	</button>
</div>

<div class="common-buttons g-pad">
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

<style>
	.common-buttons {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--space-s);
		border-bottom: 1px solid var(--border);
	}
</style>
