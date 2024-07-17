import { TodoButtonClearCompleted } from '@components/todo-button-clear-completed/TodoButtonClearCompleted';
import { TodoItemsLeft } from '@components/todo-items-left/TodoItemsLeft';
import { TodoContext } from '@src/context/TodoContext';
import { FilterHash } from '@src/types/enums';
import { useContext } from 'react';

import styles from './TodoBoxStatus.module.css';

export function TodoBoxStatus(): JSX.Element {
	const TODO_CONTEXT = useContext(TodoContext);

	if (!TODO_CONTEXT) {
		return <></>;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { leftTodos, currentHash } = TODO_CONTEXT;
	const ACTIVE_FILTER_STYLES = styles['m-box-status__filter--active'];

	return (
		<div className={styles['m-box-status']}>
			<TodoItemsLeft itemLefts={leftTodos} />
			<nav className={styles['m-box-status__filters']}>
				<ul className={styles['m-box-status__filters--container']}>
					<li>
						<a
							href="#all"
							aria-label="Show all tasks"
							className={`${styles['m-box-status__filter']} ${currentHash === FilterHash.All && ACTIVE_FILTER_STYLES}`}
						>
							All
						</a>
					</li>
					<li>
						<a
							href="#active"
							aria-label="Show active tasks"
							className={`${styles['m-box-status__filter']} ${currentHash === FilterHash.Active && ACTIVE_FILTER_STYLES}`}
						>
							Active
						</a>
					</li>
					<li>
						<a
							href="#completed"
							aria-label="Show completed tasks"
							className={`${styles['m-box-status__filter']} ${currentHash === FilterHash.Completed && ACTIVE_FILTER_STYLES}`}
						>
							Completed
						</a>
					</li>
				</ul>
			</nav>
			<TodoButtonClearCompleted />
		</div>
	);
}
