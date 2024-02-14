export function convertBytesToMb(bytes: number): number {
	if (bytes) {
		return Math.round(bytes / 1024 / 1024);
	}
	return 0;
}
