import { TodoButtonClearCompleted } from '../todo-button-clear-completed/TodoButtonClearCompleted';
import { TodoItemsLeft } from '../todo-items-left/TodoItemsLeft';
import styles from './TodoBoxStatus.module.css';

function TodoBoxStatus({ leftsTodos }: { leftsTodos: number }): JSX.Element {
	return (
		<div className={styles['m-box-status']}>
			<TodoItemsLeft itemLefts={leftsTodos} />
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
