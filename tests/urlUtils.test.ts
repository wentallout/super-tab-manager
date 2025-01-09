import { test, expect } from '@playwright/test';
import { formatTabDomain } from '$lib/utils/urlUtils';

test('formatTabDomain should remove subdomains and www', async () => {
	const url = 'https://subdomain.example.com';
	const formattedDomain = formatTabDomain(url);
	expect(formattedDomain).toBe('example.com');
});

test('formatTabDomain should handle urls without subdomains', async () => {
	const url = 'https://example.com';
	const formattedDomain = formatTabDomain(url);
	expect(formattedDomain).toBe('example.com');
});

test('formatTabDomain should handle urls with www', async () => {
	const url = 'https://www.example.com';
	const formattedDomain = formatTabDomain(url);
	expect(formattedDomain).toBe('example.com');
});

test('formatTabDomain should handle invalid urls', async () => {
	const url = 'http :// invalid url';
	expect(() => formatTabDomain(url)).toThrowError(TypeError);
});

// https://playwright.dev/docs/api/class-test#test-describe
// Declares a group of tests.
test.describe('formatTabDomain', () => {
	const urls = [
		{ url: 'https://subdomain.example.com', expected: 'example.com' },
		{ url: 'https://example.com', expected: 'example.com' },
		{ url: 'https://www.example.com', expected: 'example.com' }
	];

	test('should format domains correctly', async () => {
		for (const { url, expected } of urls) {
			const formattedDomain = formatTabDomain(url);
			expect(formattedDomain).toBe(expected);
		}
	});
});
