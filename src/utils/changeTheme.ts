import { Theme } from '@src/types/enums';

export interface ChangeThemeParameters {
	body: HTMLBodyElement;
	darkThemePreference: MediaQueryList;
	useSystemTheme: boolean;
	setTheme: (value: React.SetStateAction<Theme>) => void;
}

export function changeTheme({
	body,
	darkThemePreference,
	useSystemTheme,
	setTheme,
}: ChangeThemeParameters): void {
	let currentTheme = body.classList.contains(Theme.Light)
		? Theme.Light
		: Theme.Dark;

	let newTheme = currentTheme === Theme.Light ? Theme.Dark : Theme.Light;

	if (useSystemTheme) {
		newTheme = darkThemePreference.matches ? Theme.Dark : Theme.Light;
	}

	body.classList.replace(currentTheme, newTheme);

	currentTheme = body.classList.contains(Theme.Light)
		? Theme.Light
		: Theme.Dark;

	setTheme(currentTheme);
}
