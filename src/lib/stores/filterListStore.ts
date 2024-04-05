import nsfwTxtAsString from '/filterLists/unsafeList.txt?raw';
import socialTxtAsString from '/filterLists/socialList.txt?raw';

import { writable } from 'svelte/store';
export const nsfwListStore = writable<string[]>();

export function getNsfwList(): string[] {
	const fileContent = nsfwTxtAsString;
	return fileContent.split('\n').map((domain) => domain.trim());
}

// export function getSocialList(): string[] {
// 	const fileContent = socialTxtAsString;
// 	return fileContent.split('\n').map((domain) => domain.trim());
// }

export function getSocialList(): Set<string> {
    const fileContent = socialTxtAsString;
    const socialList = fileContent.split('\n').map((domain) => domain.trim());
    return new Set(socialList);
}