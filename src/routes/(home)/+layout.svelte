<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import '$lib/styles/global.css';
	import CommonButtons from '$lib/components/layout/CommonButtons.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import ToastCustom from '$components/toast/ToastCustom.svelte';

	import { fly } from 'svelte/transition';
	export let data: any;
</script>

<ToastCustom />

<Header />
<CommonButtons />

{#key data.url}
	<main
		class="g-pad"
		in:fly={{ x: -100, duration: 100, delay: 100 }}
		out:fly={{ x: 100, duration: 100 }}>
		<slot />
	</main>
{/key}

<Footer />

<style>
	main {
		min-height: 100dvh;
	}
</style>
