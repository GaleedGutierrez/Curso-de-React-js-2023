import React, { useState } from 'react';

import styles from './App.module.css';
import { Header } from './components/common/header/Header';
import { TodoBoxStatus } from './components/todo-box-status/TodoBoxStatus';
import { TodoItem } from './components/todo-item/TodoItem';
import { TodoList } from './components/todo-list/TodoList';
import { TodoAddNewTask } from './components/todo-search/TodoSearch';
import { Task } from './types/interfaces';
import { DEFAULT_TODOS } from './utils/defaultListTodos';
import { normalizeText } from './utils/normalizeText';

const getLengthLeftTodo = (todos: Task[]): number =>
	todos.filter((todo) => !todo.completed).length;

function App(): React.JSX.Element {
	const [searchValue, setSearchValue] = useState('');
	const [todos, setTodos] = useState(DEFAULT_TODOS);

	const SEARCHED_TODOS = todos.filter((todo) => {
		const TODO_TEXT = normalizeText(todo.text).toLocaleLowerCase();
		const TODO_SEARCH = normalizeText(searchValue).toLocaleLowerCase();

		return TODO_TEXT.includes(TODO_SEARCH);
	});

	const [leftTodos, setLeftTodos] = useState(
		getLengthLeftTodo(SEARCHED_TODOS),
	);

	const deleteTask = (id: string): void => {
		const INDEX_DELETED_TASK = todos.findIndex((todo) => todo.id === id);
		const NEW_TASKS = todos.toSpliced(INDEX_DELETED_TASK, 1);

		setTodos(NEW_TASKS);
		setLeftTodos(getLengthLeftTodo(NEW_TASKS));
	};

	const updateStatusTask = (id: string, completed: boolean): void => {
		const INDEX_DELETED_TASK = todos.findIndex((todo) => todo.id === id);
		const NEW_TASKS = todos.toSpliced(INDEX_DELETED_TASK, 1, {
			...todos[INDEX_DELETED_TASK],
			completed,
		});

		setTodos(NEW_TASKS);
	};

	return (
		<div className={styles['app-container']}>
			<Header />

			<main>
				<TodoAddNewTask
					searchValue={searchValue}
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
						<TodoBoxStatus initialLeftsTodos={leftTodos} />
					</section>

					<p className={styles['app-container__drag-and-drop']}>
						Drag and drop to reorder list
					</p>
				</div>
			</main>
		</div>
	);
}

export default App;
