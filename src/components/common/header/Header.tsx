import { MoonIcon } from '@components/ui/atoms/icons/moon-icon/MoonIcon';
import { SunIcon } from '@components/ui/atoms/icons/sun-icon/SunIcon';
import { TodoContext } from '@src/context/todo-context/TodoContext';
import { Theme } from '@src/types/enums';
import { useContext } from 'react';

import styles from './Header.module.css';

export function Header(): JSX.Element {
	const TODO_CONTEXT = useContext(TodoContext);

	if (!TODO_CONTEXT) {
		return <></>;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { theme, changeTheme } = TODO_CONTEXT;

	return (
		<header className={styles['g-header']}>
			<h1 className={styles['g-header__title']}>TODO</h1>
			<button
				className={styles['g-header__theme-icon']}
				aria-label="Change theme"
				onClick={() => changeTheme()}
			>
				{theme === Theme.Dark ? <SunIcon /> : <MoonIcon />}
			</button>
		</header>
	);
}
