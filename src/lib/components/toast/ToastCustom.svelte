<script lang="ts">
	/* eslint svelte/valid-compile: ["error", { ignoreWarnings: true }] */
	import { Toaster } from 'svelte-sonner';

	import { Check, Error, Warning, Info } from '$lib/icons.ts';

	import { TOASTER_DURATION, TOASTER_VISIBLE } from '$lib/constants/ui.ts';
</script>

<Toaster
	duration={TOASTER_DURATION}
	position="bottom-right"
	toastOptions={{
		class: 'custom-toast'
	}}
	visibleToasts={TOASTER_VISIBLE}>
	<Check slot="success-icon" />
	<Error slot="error-icon" />
	<Info slot="info-icon" />
	<Warning slot="warning-icon" />
</Toaster>

<style global>
	.custom-toast {
		font-size: var(--step-0) !important;
		background-color: var(--background);
		color: var(--copy);

		border: 1px solid var(--border);
		&[data-type='error'] {
			color: var(--error-content) !important;
		}

		&[data-type='success'] {
			color: var(--success-content) !important;
		}

		&[data-type='warning'] {
			color: var(--warning-content) !important;
		}

		&[data-type='info'] {
			color: var(--info-content) !important;
		}

		&[data-description] {
			color: var(--background) !important;
			font-size: var(--step--1);
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
</style>
