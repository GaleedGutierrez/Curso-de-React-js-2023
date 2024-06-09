import { TodoButtonClearCompleted } from '@components/todo-button-clear-completed/TodoButtonClearCompleted';
import { TodoItemsLeft } from '@components/todo-items-left/TodoItemsLeft';
import { TodoContext } from '@src/context/todo-context/TodoContext';
import { useContext } from 'react';

import styles from './TodoBoxStatus.module.css';

function TodoBoxStatus(): JSX.Element {
	const TODO_CONTEXT = useContext(TodoContext);

	if (!TODO_CONTEXT) {
		return <></>;
	}

	const { leftTodos } = TODO_CONTEXT;

	return (
		<div className={styles['m-box-status']}>
			<TodoItemsLeft itemLefts={leftTodos} />
			<nav className={styles['m-box-status__filters']}>
				<a
					href="#all"
					aria-label="Show all tasks"
					className={`${styles['m-box-status__filter']} ${styles['m-box-status__filter--active']}`}
				>
					All
				</a>
				<a
					href="#active"
					aria-label="Show active tasks"
					className={styles['m-box-status__filter']}
				>
					Active
				</a>
				<a
					href="#completed"
					aria-label="Show completed tasks"
					className={styles['m-box-status__filter']}
				>
					Completed
				</a>
			</nav>
			<TodoButtonClearCompleted />
		</div>
	);
}

export { TodoBoxStatus };
