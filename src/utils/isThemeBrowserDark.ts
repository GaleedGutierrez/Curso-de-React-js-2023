export function isThemeBrowserDark(): boolean {
	return globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
}
