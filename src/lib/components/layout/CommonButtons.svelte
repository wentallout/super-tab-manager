<script lang="ts">
	import {
		closeDuplicatedTabs,
		closeNsfwTabs,
		closeSocialTabs,
		groupTabsByAllDomains,
		ungroupAllTabs
	} from '$stores/tabStore';
	import { onMount } from 'svelte';

	import Badge from '$lib/components/badge/Badge.svelte';

	import {
		Recycling,
		Danger,
		SocialIcon,
		TabGroup,
		ArrowsOutward,
		PictureInPicture
	} from '$lib/icons.ts';

	import {
		getCountDuplicatedTabs,
		duplicatedTabCountStore,
		nsfwTabCountStore,
		getCountNsfwTabs,
		socialTabCountStore,
		getCountSocialTabs
	} from '$stores/countStore';
	import { togglePictureInPicture } from '$lib/utils/pictureInPictureUtils';

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

		<button class="btn btn--error" on:click={ungroupAllTabs}>
			<ArrowsOutward height="24" width="24" />
			Ungroup All Tabs</button>

		<button class="btn btn--error" on:click={togglePictureInPicture}>
			<PictureInPicture height="24" width="24" />
			Picture in Picture
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
