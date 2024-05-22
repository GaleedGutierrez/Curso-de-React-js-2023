import { TodoButtonClearCompleted } from '../todo-button-clear-completed/TodoButtonClearCompleted';
import { TodoItemsLeft } from '../todo-items-left/TodoItemsLeft';
import styles from './TodoBoxStatus.module.css';

function TodoBoxStatus(): JSX.Element {
	return (
		<div className={styles['m-box-status']}>
			<TodoItemsLeft itemLefts={10} />
			<nav className={styles['m-box-status__filters']}>
				<a
					href="#all"
					className={`${styles['m-box-status__filter']} ${styles['m-box-status__filter--active']}`}
				>
					All
				</a>
				<a
					href="#active"
					className={styles['m-box-status__filter']}
				>
					Active
				</a>
				<a
					href="#completed"
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
