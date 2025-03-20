# Super Tab Manager

<a href="https://www.producthunt.com/posts/super-tab-manager?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-super&#0045;tab&#0045;manager" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=440199&theme=light" alt="Super&#0032;Tab&#0032;Manager - You&#0032;opened&#0032;too&#0032;many&#0032;browser&#0032;tabs&#0063;&#0032;This&#0032;extension&#0032;is&#0032;for&#0032;you | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

![image 28](https://github.com/user-attachments/assets/7e4a89f3-6c40-4117-8e30-252a2577327d)

A chrome extension that helps you clean and manage your messy tabs.

<a href="https://chromewebstore.google.com/detail/super-tab-manager/bkjlmdjfdppebnijgnhgfdnojfneppaa">
<img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Get uBlock Origin for Chromium">
</a>

## Explanation

https://wentallout.io.vn/project/super-tab-manager

## Changelog

- v1.0.7: add smooth page transition, make all buttons the same size, tab-related buttons only show up when that tab is hovered. Fix bugs where it does not detect certain NSFW url if it has subdomains. Example: `la.utube` instead of `utube`.
- v1.0.6: add Picture-in-Picture feature
- v1.0.5: add Ungroup All feature
- v1.0.4: improve UI

## 🏆 Features

- Lightweight, performant extension that won't slow down your work.
- 🕶️ Dual view: see opened Tabs and Domains separately.
- 🔎 Search all tabs: find your lost tab by typing its title, then bookmark or close it.
- 📦 Group Tabs By Domains: instantly tidy your messy tabs by grouping them based on their domains.
- 🗑️ Close Duplicated: clean up your tabs by removing unnecessary duplicates.
- 🗑️ Close NSFW: remove unsafe tabs from your browser, saves you from trouble.
- 🗑️ Close Social: remove all social media tabs from your browser, allows you to focus on your work.
- Memory Tracking: show you how much memory you have left in your system.

## 📱 UI

- Dark/Light mode based on users system settings.
- 100% Responsive on any devices (even on Mobile if you can install extensions there)

## 🌠 Upcoming Features

- Group tabs using user-defined category
- Archive tabs
- ✅ Picture-in-picture mode (implemented in v1.0.7)

## What I used

- HTML, CSS, TypeScript
- [FrontEnd - SvelteKit](https://kit.svelte.dev/)
- BackEnd: not needed
- [Icons - `unplugin-icons`](https://icon-sets.iconify.design/material-symbols-light/)
- Vite plugins: `lightningcss`

## Developing

Chrome extension cannot be run in development mode, it needs to be rebuilt and then you have to install that `build` folder into chrome extensions.

```bash
npm run build
```

## Credit

[Making a Chrome extension with Svelte](https://javascript.plainenglish.io/making-a-chrome-extension-with-svelte-2fefb3769c)
