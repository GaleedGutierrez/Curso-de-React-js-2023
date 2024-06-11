import { useLocalStorageList } from '@hooks/useLocalStorageList';
import { Theme } from '@src/types/enums';
import { ITodoContext, Task } from '@src/types/interfaces';
import { getLengthLeftTodo } from '@utils/getLengthLeftTodo';
import { normalizeText } from '@utils/normalizeText';
import { createContext, FC, useEffect, useState } from 'react';

interface Props {
	children: React.ReactNode;
}

const IS_THEME_DARK = globalThis.matchMedia(
	'(prefers-color-scheme: dark)',
).matches;
const CURRENT_THEME = IS_THEME_DARK ? Theme.Dark : Theme.Light;
const BODY = document.getElementById('body');

if (BODY instanceof HTMLBodyElement) {
	BODY.classList.add(CURRENT_THEME);
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoContextProvider: FC<Props> = ({ children }) => {
	const CURRENT_STORAGE_KEY = 'todoAppV1';
	const DARK_THEME_PREFERENCE = globalThis.matchMedia(
		'(prefers-color-scheme: dark)',
	);
	const [TODOS, setTodos] = useLocalStorageList<Task>(CURRENT_STORAGE_KEY);
	const [SEARCH_VALUE, setSearchValue] = useState('');
	const [LEFT_TODOS, setLeftTodos] = useState(getLengthLeftTodo(TODOS));
	const [THEME, setTheme] = useState(
		DARK_THEME_PREFERENCE.matches ? Theme.Dark : Theme.Light,
	);

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

	const changeTheme = (useSystemTheme = false): void => {
		let currentTheme = BODY?.classList.contains(Theme.Light)
			? Theme.Light
			: Theme.Dark;

		let newTheme = currentTheme === Theme.Light ? Theme.Dark : Theme.Light;

		if (useSystemTheme) {
			newTheme = DARK_THEME_PREFERENCE.matches ? Theme.Dark : Theme.Light;
		}

		BODY?.classList.replace(currentTheme, newTheme);

		currentTheme = BODY?.classList.contains(Theme.Light)
			? Theme.Light
			: Theme.Dark;

		setTheme(currentTheme);
	};

	useEffect(() => {
		setLeftTodos(getLengthLeftTodo(SEARCHED_TODOS));
	}, [SEARCHED_TODOS]);

	useEffect(() => {
		DARK_THEME_PREFERENCE.addEventListener('change', () =>
			changeTheme(true),
		);
	});

	return (
		<TodoContext.Provider
			value={{
				searchValue: SEARCH_VALUE,
				setSearchValue,
				searchedTodos: SEARCHED_TODOS,
				deleteTask,
				setLeftTodos,
				updateStatusTask,
				leftTodos: LEFT_TODOS,
				theme: THEME,
				setTheme,
				changeTheme,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
