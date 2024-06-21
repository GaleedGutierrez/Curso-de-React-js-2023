import { TodoContext } from '@src/context/TodoContext';
import { TaskId } from '@src/types/enums';
import { Task } from '@src/types/interfaces';
import { DeleteTaskParams } from '@src/utils/deleteTask';
import { updateTask } from '@src/utils/updateTask';
import { FC, useContext, useState } from 'react';

import styles from './TodoInputEditingTask.module.css';

// Types
interface Props {
	isEditing: boolean;
	lastValue: string;
	id: Uuid;
}

interface handleKeyUp {
	event: React.KeyboardEvent<HTMLTextAreaElement>;
	id: Uuid;
	todos: Task[];
	setTodos: (newItem: Task[]) => void;
	deleteTask: ({ todos, setTodos, id }: DeleteTaskParams) => void;
	setEditingTask: React.Dispatch<React.SetStateAction<Uuid>>;
}

// Handlers
function handleKeyUp({
	event,
	id,
	todos,
	setTodos,
	deleteTask,
	setEditingTask,
}: handleKeyUp): void {
	const KEY = event.code;

	if (!(KEY === 'Enter') && !(KEY === 'NumpadEnter')) {
		return;
	}

	const NEW_TEXT = event.currentTarget.value.trim();

	if (!NEW_TEXT) {
		deleteTask({ id, todos, setTodos });
		setEditingTask(TaskId.Base);

		return;
	}

	updateTask({
		todos,
		setTodos,
		id,
		newText: NEW_TEXT,
	});
	setEditingTask(TaskId.Base);
}

// Component
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

	const { setEditingTask, deleteTask, todos, setTodos } = TODO_CONTEXT;

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
				onKeyUp={(event) =>
					handleKeyUp({
						event,
						id,
						todos,
						setTodos,
						deleteTask,
						setEditingTask,
					})
				}
			></textarea>
		</label>
	);
};
