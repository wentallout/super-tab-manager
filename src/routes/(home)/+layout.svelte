<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import '$lib/styles/global.css';
	import CommonButtons from '$lib/components/layout/CommonButtons.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import ToastCustom from '$components/toast/ToastCustom.svelte';
	import { getSocialList } from '$stores/filterListStore';

	console.log(getSocialList());
</script>

<ToastCustom />

<Header />
<CommonButtons />
<main class="g-pad">
	<slot />
</main>

<Footer />

<style>
	main {
		min-height: 100vh;
	}
</style>
