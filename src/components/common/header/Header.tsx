import { MoonIcon } from '../moon-icon/MoonIcon';
import styles from './Header.module.css';

export function Header(): JSX.Element {
	return (
		<header className={styles['g-header']}>
			<h1 className={styles['g-header__title']}>TODO</h1>
			<button className={styles['g-header__theme-icon']}>
				<MoonIcon />
				{/* <SunIcon /> */}
			</button>
		</header>
	);
}
