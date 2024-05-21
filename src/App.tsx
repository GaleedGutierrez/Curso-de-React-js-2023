import React from 'react';

import styles from './App.module.css';
import { Header } from './components/common/header/Header';
import { TodoBoxStatus } from './components/todo-box-status/TodoBoxStatus';
import { TodoDragAndDrop } from './components/todo-drag-and-drop/TodoDragAndDrop';
import { TodoItem } from './components/todo-item/TodoItem';
import { TodoList } from './components/todo-list/TodoList';
import { TodoSearch } from './components/todo-search/TodoSearch';
import { Item } from './types/interfaces';

const DEFAULT_TODOS: Item[] = [
	{ text: 'Cortar cebolla', completed: true },
	{ text: 'Tomar el curso de intro a React', completed: false },
	{ text: 'Llorar con la llorona', completed: false },
	{ text: 'Ver Platzi Live', completed: true },
	{ text: 'Ir al gym', completed: false },
];

function App(): React.JSX.Element {
	return (
		<>
			<Header />
			{/* <TodoCounter
				completed={16}
				total={25}
			/> */}
			<main>
				<TodoSearch />
				<section className={styles['g-todo-container']}>
					<TodoList>
						{DEFAULT_TODOS.map(({ text, completed }) => (
							<TodoItem
								key={text}
								text={text}
								completed={completed}
							/>
						))}
					</TodoList>
					<TodoBoxStatus />
				</section>
				<TodoDragAndDrop />
			</main>
		</>
	);
}

export default App;
