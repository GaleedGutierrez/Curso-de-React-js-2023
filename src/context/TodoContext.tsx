import { useLocalStorageList } from '@hooks/useLocalStorageList';
import { FilterHash, TaskId, Theme } from '@src/types/enums';
import { ITodoContext, Task } from '@src/types/interfaces';
import { changeTheme } from '@src/utils/changeTheme';
import { deleteTask } from '@src/utils/deleteTask';
import { isThemeBrowserDark } from '@src/utils/isThemeBrowserDark';
import { updateStatusTask } from '@src/utils/updateStatusTask';
import { updateTask } from '@src/utils/updateTask';
import { getLengthLeftTodo } from '@utils/getLengthLeftTodo';
import { createContext, FC, useEffect, useState } from 'react';

interface Props {
	children: React.ReactNode;
}

const IS_THEME_DARK = isThemeBrowserDark();
const CURRENT_THEME = IS_THEME_DARK ? Theme.Dark : Theme.Light;
const BODY = document.getElementById('body') as HTMLBodyElement;

BODY.classList.add(CURRENT_THEME);

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

globalThis.location.hash = FilterHash.All;

export const TodoContextProvider: FC<Props> = ({ children }) => {
	// Global variables
	const CURRENT_STORAGE_KEY = 'todoAppV1';
	const DARK_THEME_PREFERENCE = globalThis.matchMedia(
		'(prefers-color-scheme: dark)',
	);

	// States
	const [TODOS, setTodos] = useLocalStorageList<Task>(CURRENT_STORAGE_KEY);
	const [LEFT_TODOS, setLeftTodos] = useState(getLengthLeftTodo(TODOS));
	const [THEME, setTheme] = useState(
		DARK_THEME_PREFERENCE.matches ? Theme.Dark : Theme.Light,
	);
	const [EDITING_TASK, setEditingTask] = useState<Task['id']>(TaskId.Reset);
	const [CURRENT_HASH, setCurrentHash] = useState(FilterHash.All);
	// Functions
	const FILTERED_TODOS = TODOS.filter((todo) => {
		if (CURRENT_HASH === FilterHash.Active) {
			return !todo.completed;
		}

		if (CURRENT_HASH === FilterHash.Completed) {
			return todo.completed;
		}

		return true;
	});

	// Effects
	useEffect(() => {
		setLeftTodos(getLengthLeftTodo(TODOS));
	}, [TODOS]);

	useEffect(() => {
		DARK_THEME_PREFERENCE.addEventListener('change', () =>
			changeTheme({
				body: BODY,
				darkThemePreference: DARK_THEME_PREFERENCE,
				setTheme,
				useSystemTheme: true,
			}),
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
				deleteTask({ todos: TODOS, setTodos, id: TASK_ID });
				setEditingTask(TaskId.Reset);

				return;
			}

			updateTask({
				todos: TODOS,
				setTodos,
				id: TASK_ID,
				newText: NEW_TEXT,
			});
			setEditingTask(TaskId.Reset);
		});
	});

	useEffect(() => {
		globalThis.addEventListener('hashchange', () => {
			const HASH = globalThis.location.hash;

			if ((HASH as FilterHash) === FilterHash.Active) {
				setCurrentHash(FilterHash.Active);
			}

			if ((HASH as FilterHash) === FilterHash.Completed) {
				setCurrentHash(FilterHash.Completed);
			}

			if ((HASH as FilterHash) === FilterHash.All) {
				setCurrentHash(FilterHash.All);
			}
		});
	});

	const CONTEXT_VALUE = {
		todos: TODOS,
		setTodos,
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
		body: BODY,
		darkThemePreference: DARK_THEME_PREFERENCE,
		filteredTodos: FILTERED_TODOS,
		currentHash: CURRENT_HASH,
	};

	return (
		<TodoContext.Provider value={CONTEXT_VALUE}>
			{children}
		</TodoContext.Provider>
	);
};
