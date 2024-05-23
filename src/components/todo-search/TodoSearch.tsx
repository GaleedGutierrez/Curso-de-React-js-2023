import { useState } from 'react';

import styles from './TodoSearch.module.css';

interface State {
	searchValue: string;
	setSearchValue: (value: React.SetStateAction<string>) => void;
}

export function TodoAddNewTask({
	searchValue,
	setSearchValue,
}: State): JSX.Element {
	return (
		<label
			className={styles['m-todo-search__container']}
			htmlFor="new-todo"
		>
			<input
				type="text"
				placeholder="Create a new task…"
				className={styles['m-todo-search__input']}
				id="new-todo"
				value={searchValue}
				onChange={(event) => {
					const VALUE = event.target.value;

					setSearchValue(VALUE);
				}}
			/>
		</label>
	);
}

export function TodoClick(): JSX.Element {
	const [state, setState] = useState(0);

	return (
		<>
			<p>Diste click {state} veces</p>
			<button
				onClick={() => {
					setState((prevState) => prevState + 1);
				}}
			>
				Click
			</button>
		</>
	);
}
