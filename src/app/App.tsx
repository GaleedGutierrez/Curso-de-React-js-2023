import { useLocalStorageList } from '@hooks/useLocalStorageList';
import { Task } from '@src/types/interfaces';
import { getLengthLeftTodo } from '@utils/getLengthLeftTodo';
import { normalizeText } from '@utils/normalizeText';
import { useEffect, useState } from 'react';

import { AppUI } from './AppUI';

export function App(): JSX.Element {
	const CURRENT_STORAGE_KEY = 'todoAppV1';
	const [TODOS, setTodos] = useLocalStorageList<Task>(
		CURRENT_STORAGE_KEY,
		[],
	);
	const [SEARCH_VALUE, setSearchValue] = useState('');
	const [LEFT_TODOS, setLeftTodos] = useState(getLengthLeftTodo(TODOS));

	const SEARCHED_TODOS = TODOS.filter((todo) => {
		const TODO_TEXT = normalizeText(todo.text).toLocaleLowerCase();
		const TODO_SEARCH = normalizeText(SEARCH_VALUE).toLocaleLowerCase();

		return TODO_TEXT.includes(TODO_SEARCH);
	});

	const deleteTask = (id: string): void => {
		const INDEX_DELETED_TASK = TODOS.findIndex((todo) => todo.id === id);
		const NEW_TASKS = TODOS.toSpliced(INDEX_DELETED_TASK, 1);

		setTodos(NEW_TASKS);
	};

	const updateStatusTask = (id: string, completed: boolean): void => {
		const INDEX_DELETED_TASK = TODOS.findIndex((todo) => todo.id === id);
		const NEW_TASKS = TODOS.toSpliced(INDEX_DELETED_TASK, 1, {
			...TODOS[INDEX_DELETED_TASK],
			completed,
		});

		setTodos(NEW_TASKS);
	};

	useEffect(() => {
		setLeftTodos(getLengthLeftTodo(SEARCHED_TODOS));
	}, [SEARCHED_TODOS]);

	return (
		<AppUI
			searchValue={SEARCH_VALUE}
			setSearchValue={setSearchValue}
			searchedTodos={SEARCHED_TODOS}
			deleteTask={deleteTask}
			setLeftTodos={setLeftTodos}
			updateStatusTask={updateStatusTask}
			leftTodos={LEFT_TODOS}
		/>
	);
}
