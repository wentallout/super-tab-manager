<script>
	import { APP_NAME, WEBSITE, EMAIL, GITHUB } from '$lib/constants/ui';
</script>

<footer class="footer g-pad">
	<div class="footer__about">
		<img class="footer__logo" src="icon32.png" alt="logo" />
		<h1>{APP_NAME}</h1>
	</div>

	<div class="footer__credit">
		<p>Made by Nguyen Dang Khoa</p>
		<a class="footer__link" href={WEBSITE} target="_blank">Website</a>
		<a class="footer__link" href={GITHUB} target="_blank">GitHub</a>
		<a class="footer__link" href={EMAIL} target="_blank">Bug Report</a>
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

	.footer__about {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-2xs);
	}

	.footer__logo {
		width: 24px;
		height: 24px;
	}

	h1 {
		font-size: var(--step-2);
		font-weight: 600;
	}
</style>
