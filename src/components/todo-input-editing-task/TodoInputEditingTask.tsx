import { TodoContext } from '@src/context/todo-context/TodoContext';
import { FC, useContext, useState } from 'react';

import styles from './TodoInputEditingTask.module.css';

interface Props {
	isEditing: boolean;
	lastValue: string;
	id: `${string}-${string}-${string}-${string}-${string}`;
}

export const TodoInputEditingTask: FC<Props> = ({
	isEditing,
	lastValue,
	id,
}) => {
	const TODO_CONTEXT = useContext(TodoContext);
	const [newTask, setNewTask] = useState(lastValue);

	if (!TODO_CONTEXT) {
		return <></>;
	}

	const { updateTask, setEditingTask, deleteTask } = TODO_CONTEXT;

	return (
		<label className={styles['m-editing-task__container']}>
			<textarea
				placeholder=""
				className={`${styles['m-editing-task__input']} ${isEditing && 'editing'}`}
				id={id}
				value={newTask}
				onChange={(event) => {
					const VALUE = event.target.value;

					setNewTask(VALUE);
				}}
				onKeyUp={(event) => {
					const KEY = event.code;

					if (KEY === 'Enter' || KEY === 'NumpadEnter') {
						const NEW_TEXT = event.currentTarget.value.trim();

						if (NEW_TEXT === '') {
							deleteTask(id);
						} else {
							updateTask(id, NEW_TEXT);
						}

						setEditingTask('0-0-0-0-0');
					}
				}}
			></textarea>
		</label>
	);
};
