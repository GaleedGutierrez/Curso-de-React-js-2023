import { TodoContext } from '@src/context/todo-context/TodoContext';
import { useContext } from 'react';

import styles from './TodoSearch.module.css';

export function TodoAddNewTask(): JSX.Element {
	const TODO_CONTEXT = useContext(TodoContext);

	if (!TODO_CONTEXT) {
		return <></>;
	}

	const { searchValue, setSearchValue } = TODO_CONTEXT;

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
