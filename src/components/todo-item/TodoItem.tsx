import { TodoContext } from '@src/context/TodoContext';
import { FC, useContext, useState } from 'react';

import { TodoInputEditingTask } from '../todo-input-editing-task/TodoInputEditingTask';
import { CheckboxIcon } from '../ui/atoms/checkbox-icon/CheckboxIcon';
import { CrossIcon } from '../ui/atoms/icons/cross-icon/CrossIcon';
import styles from './TodoItem.module.css';

interface Props {
	text: string;
	initialCompleted: boolean;
	id: `${string}-${string}-${string}-${string}-${string}`;
	isEditing: boolean;
}

export const TodoItem: FC<Props> = ({
	text,
	initialCompleted,
	id,
	isEditing,
}) => {
	const [IS_COMPLETED, setIsCompleted] = useState(initialCompleted);
	const TODO_CONTEXT = useContext(TodoContext);
	let lastTap = 0;

	if (!TODO_CONTEXT) {
		return <></>;
	}

	const {
		deleteTask,
		setLeftTodos,
		updateStatusTask,
		setEditingTask,
		todos,
		setTodos,
	} = TODO_CONTEXT;

	function handleDoubleTap(): void {
		const CURRENT_TIME = new Date().getTime();
		const TAP_LENGTH = CURRENT_TIME - lastTap;

		if (TAP_LENGTH > 500) {
			lastTap = CURRENT_TIME;

			return;
		}

		lastTap = CURRENT_TIME;
		setEditingTask(id);
	}

	function handleDoubleClick(): void {
		setEditingTask(id);
	}

	const updateCompleted = (): void => {
		setIsCompleted(!IS_COMPLETED);
		setLeftTodos((prev) => (IS_COMPLETED ? prev + 1 : prev - 1));
		updateStatusTask({ todos, id, completed: !IS_COMPLETED, setTodos });
	};

	return (
		<li className={isEditing ? '' : styles['m-todo-item']}>
			{isEditing ? (
				<TodoInputEditingTask
					isEditing={isEditing}
					lastValue={text}
					id={id}
				/>
			) : (
				<>
					<div className={styles['m-todo-item__task-container']}>
						<label className={styles['m-todo-item__label']}>
							<CheckboxIcon
								isCompleted={IS_COMPLETED}
								updateIsCompleted={updateCompleted}
							/>
						</label>
						<span
							className={styles['m-todo-item__task']}
							onDoubleClickCapture={() => handleDoubleClick()}
							onTouchEndCapture={handleDoubleTap}
						>
							{IS_COMPLETED ? <s>{text}</s> : text}
						</span>
					</div>
					<button
						type="button"
						className={styles['m-todo-item__close-button']}
						aria-label="Delete task"
						onClick={() => {
							deleteTask({ id, todos, setTodos });
						}}
					>
						<CrossIcon />
					</button>
				</>
			)}
		</li>
	);
};
