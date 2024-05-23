export function normalizeText(text: string): string {
	const REGEX = new RegExp(/[\u0300-\u036f]/, 'g');

	// console.log(text.normalize('NFD').replaceAll(REGEX, ''));

	return text.normalize('NFD').replace(REGEX, '').trim();
}
