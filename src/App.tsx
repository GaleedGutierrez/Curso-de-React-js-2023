import { useState } from 'react';

import styles from './App.module.css';
import { Header } from './components/common/header/Header';
import { TodoBoxStatus } from './components/todo-box-status/TodoBoxStatus';
import { TodoItem } from './components/todo-item/TodoItem';
import { TodoList } from './components/todo-list/TodoList';
import { TodoAddNewTask } from './components/todo-search/TodoSearch';
import { Task } from './types/interfaces';
import { normalizeText } from './utils/normalizeText';

function updateLocalStorage(newTodos: Task[]): void {
	localStorage.setItem('todoAppV1', JSON.stringify(newTodos));
}

const getLengthLeftTodo = (todos: Task[]): number =>
	todos.filter((todo) => !todo.completed).length;

// localStorage.removeItem('todoAppV1');

const parsedTodo = JSON.parse(
	localStorage.getItem('todoAppV1') ?? '[]',
) as Task[];

export function App(): JSX.Element {
	const [SEARCH_VALUE, setSearchValue] = useState('');
	const [TODOS, setTodos] = useState(parsedTodo);
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
		setLeftTodos(getLengthLeftTodo(NEW_TASKS));
		updateLocalStorage(NEW_TASKS);
	};

	const updateStatusTask = (id: string, completed: boolean): void => {
		const INDEX_DELETED_TASK = TODOS.findIndex((todo) => todo.id === id);
		const NEW_TASKS = TODOS.toSpliced(INDEX_DELETED_TASK, 1, {
			...TODOS[INDEX_DELETED_TASK],
			completed,
		});

		setTodos(NEW_TASKS);
		updateLocalStorage(NEW_TASKS);
	};

	return (
		<div className={styles['app-container']}>
			<Header />

			<main>
				<TodoAddNewTask
					searchValue={SEARCH_VALUE}
					setSearchValue={setSearchValue}
				/>

				<div
					style={{
						display: SEARCHED_TODOS.length === 0 ? 'none' : 'block',
					}}
				>
					<section className={styles['g-todo-container']}>
						<TodoList>
							{SEARCHED_TODOS.map(({ text, completed, id }) => (
								<TodoItem
									key={id}
									id={id}
									text={text}
									initialCompleted={completed}
									deleteTask={deleteTask}
									setLeftTodos={setLeftTodos}
									updateStatusTask={updateStatusTask}
								/>
							))}
						</TodoList>
						<TodoBoxStatus initialLeftsTodos={LEFT_TODOS} />
					</section>

					<p className={styles['app-container__drag-and-drop']}>
						Drag and drop to reorder list
					</p>
				</div>
			</main>
		</div>
	);
}
