import { CheckboxIcon } from '@components/ui/atoms/checkbox-icon/CheckboxIcon';
import { CrossIcon } from '@components/ui/atoms/icons/cross-icon/CrossIcon';
import { TodoContext } from '@src/context/todo-context/TodoContext';
import { FC, useContext, useState } from 'react';

import styles from './TodoItem.module.css';

interface Props {
	text: string;
	initialCompleted: boolean;
	id: string;
}

export const TodoItem: FC<Props> = ({ text, initialCompleted, id }) => {
	const [isCompleted, setIsCompleted] = useState(initialCompleted);
	const TODO_CONTEXT = useContext(TodoContext);

	if (!TODO_CONTEXT) {
		return <></>;
	}

	const { deleteTask, setLeftTodos, updateStatusTask } = TODO_CONTEXT;
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
