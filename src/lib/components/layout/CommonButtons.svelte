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

<div class="group-wrapper g-pad">
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
	.group-wrapper {
		gap: var(--space-xs);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	.group-wrapper .btn {
		justify-content: flex-start;
	}
</style>
