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
const BODY = document.getElementById('body') as HTMLBodyElement;

BODY.classList.add(CURRENT_THEME);

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
	const [EDITING_TASK, setEditingTask] = useState<Task['id']>('0-0-0-0-0');

	const SEARCHED_TODOS = TODOS.filter((todo) => {
		const TODO_TEXT = normalizeText(todo.text).toLocaleLowerCase();
		const TODO_SEARCH = normalizeText(SEARCH_VALUE).toLocaleLowerCase();

		return TODO_TEXT.includes(TODO_SEARCH);
	});

	const updateTask = (id: Task['id'], newText: string): void => {
		const INDEX_UPDATED_TASK = TODOS.findIndex((todo) => todo.id === id);
		const UPDATED_TASKS = TODOS;

		UPDATED_TASKS[INDEX_UPDATED_TASK].text = newText;
		setTodos(UPDATED_TASKS);
	};

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
		let currentTheme = BODY.classList.contains(Theme.Light)
			? Theme.Light
			: Theme.Dark;

		let newTheme = currentTheme === Theme.Light ? Theme.Dark : Theme.Light;

		if (useSystemTheme) {
			newTheme = DARK_THEME_PREFERENCE.matches ? Theme.Dark : Theme.Light;
		}

		BODY.classList.replace(currentTheme, newTheme);

		currentTheme = BODY.classList.contains(Theme.Light)
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

	useEffect(() => {
		BODY.addEventListener('click', (event) => {
			const TARGET = event.target;
			const IS_EDITING =
				TARGET instanceof HTMLElement &&
				!TARGET.classList.contains('editing');

			if (!IS_EDITING) {
				return;
			}

			const EDITING_TASK = document.querySelector('.editing');
			const IS_TEXTAREA = EDITING_TASK instanceof HTMLTextAreaElement;

			if (!IS_TEXTAREA) {
				return;
			}

			const TASK_ID = EDITING_TASK.id as Task['id'];
			const NEW_TEXT = EDITING_TASK.value.trim();

			if (!NEW_TEXT) {
				deleteTask(TASK_ID);
			} else {
				updateTask(TASK_ID, NEW_TEXT);
			}

			setEditingTask('0-0-0-0-0');
		});
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
				editingTask: EDITING_TASK,
				setEditingTask,
				updateTask,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
