import { TodoButtonClearCompleted } from '@components/todo-button-clear-completed/TodoButtonClearCompleted';
import { TodoItemsLeft } from '@components/todo-items-left/TodoItemsLeft';
import { FC } from 'react';

import styles from './TodoBoxStatus.module.css';

interface Props {
	initialLeftsTodos: number;
}

const TodoBoxStatus: FC<Props> = ({ initialLeftsTodos }) => (
	<div className={styles['m-box-status']}>
		<TodoItemsLeft itemLefts={initialLeftsTodos} />
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

export { TodoBoxStatus };
