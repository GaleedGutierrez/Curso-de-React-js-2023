import { useState } from 'react';

import styles from './TodoSearch.module.css';

export function TodoAddNewTask(): JSX.Element {
	const [searchValue, setSearchValue] = useState('');

	// eslint-disable-next-line no-console
	console.log('Los usuario buscan TODOs de: ', searchValue);

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
