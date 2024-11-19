<script lang="ts">
	import { APP_NAME, WEBSITE_URL, MAILTO_URL, GITHUB_URL, KOFI_URL } from '$lib/constants/ui';
	import { onMount } from 'svelte';

	let version: string;

	onMount(() => {
		let manifest = chrome.runtime.getManifest();
		version = manifest.version;
	});
</script>

<footer class="footer g-pad">
	<div class="footer__about">
		<img class="footer__logo" alt="logo" src="icon32.png" />
		<h1 class="footer__app">{APP_NAME} v{version}</h1>

		<a class="footer__author" href={WEBSITE_URL} target="_blank"
			>Made by Khoa Nguyen (@wentallout)
		</a>
	</div>

	<div class="footer__credit">
		<div class="footer__links">
			<a class="footer__link" href={KOFI_URL} target="_blank">Donate</a>
			<a class="footer__link" href={MAILTO_URL} target="_blank">Bug Report</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		width: 100%;
		font-size: var(--step--1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		& .footer__link {
			color: var(--info);
		}
	}

	.footer__links {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.footer__about {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-xs);
	}

	.footer__logo {
		width: 24px;
		height: 24px;
	}

	.footer__app {
		font-size: var(--step-2);
		font-weight: 600;
	}

	.footer__author {
		color: var(--copy-lighter);
		text-decoration: none;
		font-size: var(--step--1);
	}
</style>
