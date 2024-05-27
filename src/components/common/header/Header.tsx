import { isThemeBrowserDark } from '../../../utils/isThemeBrowserDark';
import { MoonIcon } from '../moon-icon/MoonIcon';
import { SunIcon } from '../sun-icon/SunIcon';
import styles from './Header.module.css';

export function Header(): JSX.Element {
	return (
		<>
			<header className={styles['g-header']}>
				<h1 className={styles['g-header__title']}>TODO</h1>
				<button
					className={styles['g-header__theme-icon']}
					aria-label="Change theme"
				>
					{isThemeBrowserDark() ? <SunIcon /> : <MoonIcon />}
				</button>
			</header>
		</>
	);
}
