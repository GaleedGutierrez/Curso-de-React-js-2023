import { Header } from '@components/common/header/Header';
import { TodoBoxStatus } from '@components/todo-box-status/TodoBoxStatus';
import { TodoEmpty } from '@components/todo-empty/TodoEmpty';
import { TodoItem } from '@components/todo-item/TodoItem';
import { TodoList } from '@components/todo-list/TodoList';
import { TodoAddNewTask } from '@components/todo-search/TodoSearch';
import { TodoContext } from '@src/context/todo-context/TodoContext';
import { useContext } from 'react';

import styles from './App.module.css';

export function AppUI(): JSX.Element {
	const TODO_CONTEXT = useContext(TodoContext);

	if (!TODO_CONTEXT) {
		return <></>;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { searchedTodos, editingTask } = TODO_CONTEXT;

	return (
		<div className={styles['app-container']}>
			<Header />

			<main>
				<TodoAddNewTask />
				<section>
					{searchedTodos.length === 0 && <TodoEmpty />}
					{searchedTodos.length !== 0 && (
						<>
							<div className={styles['g-todo-container']}>
								<TodoList>
									{searchedTodos.map((todo) => (
										<TodoItem
											key={todo.id}
											id={todo.id}
											text={todo.text}
											initialCompleted={todo.completed}
											isEditing={editingTask === todo.id}
										/>
									))}
								</TodoList>
								<TodoBoxStatus />
							</div>
							<p
								className={
									styles['app-container__drag-and-drop']
								}
							>
								Drag and drop to reorder list
							</p>
						</>
					)}
				</section>
			</main>
		</div>
	);
}
