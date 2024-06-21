import { Header } from '@components/common/header/Header';
import { TodoBoxStatus } from '@components/todo-box-status/TodoBoxStatus';
import { TodoEmpty } from '@components/todo-empty/TodoEmpty';
import { TodoItem } from '@components/todo-item/TodoItem';
import { TodoList } from '@components/todo-list/TodoList';
import { TodoAddNewTask } from '@src/components/todo-add-new-task/TodoAddNewTask';
import { TodoContext } from '@src/context/TodoContext';
import { useContext } from 'react';

import styles from './App.module.css';

export function AppUI(): JSX.Element {
	const TODO_CONTEXT = useContext(TodoContext);

	if (!TODO_CONTEXT) {
		return <></>;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { editingTask, todos } = TODO_CONTEXT;

	return (
		<div className={styles['app-container']}>
			<Header />

			<main>
				<TodoAddNewTask />
				<section>
					{todos.length === 0 && <TodoEmpty />}
					{todos.length !== 0 && (
						<>
							<div className={styles['g-todo-container']}>
								<TodoList>
									{todos.map((todo) => (
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
