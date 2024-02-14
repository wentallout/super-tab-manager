import { writable } from 'svelte/store';

export const memoryInfoStore = writable<chrome.system.memory.MemoryInfo>();
