<!-- <script>
	import { onMount } from 'svelte';
	const saveOptions = () => {
		const color = document.getElementById('color').value;
		const likesColor = document.getElementById('like').checked;

		chrome.storage.sync.set({ favoriteColor: color, likesColor: likesColor }, () => {
			// Update status to let user know options were saved.
			const status = document.getElementById('status');
			status.textContent = 'Options saved.';
			setTimeout(() => {
				status.textContent = '';
			}, 750);
		});
	};

	onMount(() => {
		// Restores select box and checkbox state using the preferences
		// stored in chrome.storage.
		const restoreOptions = () => {
			chrome.storage.sync.get({ favoriteColor: 'red', likesColor: true }, (items) => {
				document.getElementById('color').value = items.favoriteColor;
				document.getElementById('like').checked = items.likesColor;
			});
		};

		document.addEventListener('DOMContentLoaded', restoreOptions);
	});
</script>

<h1>Options</h1>

<h2>Filter</h2>

<select id="color">
	<option value="red">red</option>
	<option value="green">green</option>
	<option value="blue">blue</option>
	<option value="yellow">yellow</option>
</select>

<label>
	<input type="checkbox" id="like" />
	I like colors.
</label>

<div id="status"></div>
<button on:click={() => saveOptions()} id="save">Save</button> -->
