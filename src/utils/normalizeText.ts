export function normalizeText(text: string): string {
	const REGEX = new RegExp(/[\u0300-\u036f]/, 'g');

	return text.normalize('NFD').replace(REGEX, '').trim();
}
