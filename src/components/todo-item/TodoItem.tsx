import { FC, useState } from 'react';

import styles from './TodoItem.module.css';

interface Props {
	text: string;
	initialCompleted: boolean;
	id: string;
	deleteTask: (id: string) => void;
	setLeftTodos: React.Dispatch<React.SetStateAction<number>>;
	updateStatusTask: (id: string, completed: boolean) => void;
}

export const TodoItem: FC<Props> = ({
	text,
	initialCompleted,
	id,
	deleteTask,
	setLeftTodos,
	updateStatusTask,
}) => {
	const [isCompleted, setIsCompleted] = useState(initialCompleted);
	const updateIsCompleted = (): void => {
		setIsCompleted(!isCompleted);
		setLeftTodos((prev) => (isCompleted ? prev + 1 : prev - 1));
		updateStatusTask(id, !isCompleted);
	};

	return (
		<li className={styles['m-todo-item']}>
			<label className={styles['m-todo-item__label']}>
				<div className="a-checkbox">
					<input
						type="checkbox"
						defaultChecked={isCompleted}
						className="is-sr-only"
						onClick={updateIsCompleted}
					/>
				</div>
				<span className={styles['m-todo-item__task']}>
					{isCompleted ? <s>{text}</s> : text}
				</span>
			</label>
			<label className={styles['m-todo-item__edit-task']}>
				<input type="text" />
			</label>
			<button
				type="button"
				className={styles['m-todo-item__close-button']}
				aria-label="Delete task"
				onClick={() => {
					deleteTask(id);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1.8rem"
					height="1.8rem"
					className="a-icon"
				>
					<path
						fill="#494C6B"
						fillRule="evenodd"
						d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
					/>
				</svg>
			</button>
		</li>
	);
};
