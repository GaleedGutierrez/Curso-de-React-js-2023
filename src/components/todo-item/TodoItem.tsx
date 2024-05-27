import { CheckboxIcon } from '@components/common/checkbox-icon/CheckboxIcon';
import { CrossIcon } from '@components/common/cross-icon/CrossIcon';
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
				<CheckboxIcon
					isCompleted={isCompleted}
					updateIsCompleted={updateIsCompleted}
				/>
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
				<CrossIcon />
			</button>
		</li>
	);
};
