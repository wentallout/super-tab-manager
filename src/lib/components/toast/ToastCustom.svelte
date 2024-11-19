<script lang="ts">
	/* eslint svelte/valid-compile: ["error", { ignoreWarnings: true }] */
	import { Toaster } from 'svelte-sonner';

	import { Check, Error, Warning, Info } from '$lib/icons.ts';

	import { TOASTER_DURATION_MS, TOASTER_VISIBLE_COUNT } from '$lib/constants/ui.ts';
</script>

<Toaster
	duration={TOASTER_DURATION_MS}
	position="bottom-right"
	toastOptions={{
		class: 'custom-toast'
	}}
	visibleToasts={TOASTER_VISIBLE_COUNT}>
	<Check color="white" slot="success-icon" />
	<Error color="white" slot="error-icon" />
	<Info color="white" slot="info-icon" />
	<Warning color="white" slot="warning-icon" />
</Toaster>

<style global>
	.custom-toast {
		font-size: var(--step-0) !important;
		background-color: var(--background);

		border: 1px solid var(--border);
		&[data-type='error'] [data-title] {
			color: var(--error-content);
		}

		&[data-type='success'] [data-title] {
			color: var(--success-content);
		}

		&[data-type='warning'] [data-title] {
			color: var(--warning-content);
		}

		&[data-type='info'] [data-title] {
			color: var(--info-content);
		}
	}

	.custom-toast [data-icon] {
		width: 24px !important;
		height: 24px !important;
		aspect-ratio: 1 / 1;
		flex-shrink: 0;
		flex-grow: 0;
	}

	.custom-toast [data-icon] svg {
		width: 24px !important;
		height: 24px !important;
		aspect-ratio: 1 / 1;
		flex-shrink: 0;
		flex-grow: 0;
	}

	:where([data-sonner-toast]) :where([data-description]) {
		color: var(--copy-light) !important;
		font-size: var(--step--1);
	}
</style>
