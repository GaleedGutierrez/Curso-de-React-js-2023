/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import styles from './App.module.css';
import { Header } from './components/common/header/Header';
import { TodoBoxStatus } from './components/todo-box-status/TodoBoxStatus';
import { TodoItem } from './components/todo-item/TodoItem';
import { TodoList } from './components/todo-list/TodoList';
import { TodoAddNewTask, TodoClick } from './components/todo-search/TodoSearch';
import { DEFAULT_TODOS } from './utils/defaultListTodos';
import { normalizeText } from './utils/normalizeText';

function App(): React.JSX.Element {
	const [searchValue, setSearchValue] = useState('');
	const [todos, setTodos] = useState(DEFAULT_TODOS);
	const LEFTS_TODOS = todos.filter((todo) => !todo.completed).length;

	const searchedTodos = todos.filter((todo) => {
		const TODO_TEXT = normalizeText(todo.text).toLocaleLowerCase();
		const TODO_SEARCH = normalizeText(searchValue).toLocaleLowerCase();

		return TODO_TEXT.includes(TODO_SEARCH);
	});

	return (
		<div className={styles['app-container']}>
			<Header />

			<main>
				<TodoAddNewTask
					searchValue={searchValue}
					setSearchValue={setSearchValue}
				/>

				<section className={styles['g-todo-container']}>
					<TodoList>
						{searchedTodos.map(({ text, completed, id }) => (
							<TodoItem
								key={id}
								text={text}
								completed={completed}
							/>
						))}
					</TodoList>
					<TodoBoxStatus leftsTodos={LEFTS_TODOS} />
				</section>

				<p className={styles['app-container__drag-and-drop']}>
					Drag and drop to reorder list
				</p>
			</main>

			<TodoClick />
		</div>
	);
}

export default App;
