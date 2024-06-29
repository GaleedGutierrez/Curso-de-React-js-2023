import { TodoContext } from '@src/context/TodoContext';
import { addNewTask } from '@src/utils/addNewTask';
import { useContext, useState } from 'react';

import styles from './TodoAddNewTask.module.css';

export function TodoAddNewTask(): JSX.Element {
	const TODO_CONTEXT = useContext(TodoContext);
	const [NEW_VALUE, setSearchValue] = useState('');

	if (!TODO_CONTEXT) {
		return <></>;
	}

	const { todos, setTodos } = TODO_CONTEXT;

	return (
		<label
			className={styles['m-todo-search__container']}
			htmlFor="new-todo"
		>
			<textarea
				placeholder="Create a new task…"
				className={styles['m-todo-search__input']}
				id="new-todo"
				value={NEW_VALUE}
				onChange={(event) => {
					const VALUE = event.target.value;

					setSearchValue(VALUE);
				}}
				onKeyUp={(event) => {
					const KEY = event.code;

					if (!(KEY === 'Enter') && !(KEY === 'NumpadEnter')) {
						return;
					}

					const TEXT = event.currentTarget.value.trim();

					setSearchValue('');
					addNewTask({ todos, setTodos, text: TEXT });
				}}
				name="new-todo"
			></textarea>
		</label>
	);
}
