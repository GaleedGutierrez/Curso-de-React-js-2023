import { TodoContext } from '@src/context/TodoContext';
import { TaskId } from '@src/types/enums';
import { Task } from '@src/types/interfaces';
import { DeleteTaskParams } from '@src/utils/deleteTask';
import { updateTask } from '@src/utils/updateTask';
import { FC, useContext, useEffect, useRef, useState } from 'react';

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
		setEditingTask(TaskId.Reset);

		return;
	}

	updateTask({
		todos,
		setTodos,
		id,
		newText: NEW_TEXT,
	});
	setEditingTask(TaskId.Reset);
}

// Component
export const TodoInputEditingTask: FC<Props> = ({
	isEditing,
	lastValue,
	id,
}) => {
	const TODO_CONTEXT = useContext(TodoContext);
	const [newTask, setNewTask] = useState(lastValue);
	const TEXTAREA_REF = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isEditing && TEXTAREA_REF.current) {
			const LENGTH = TEXTAREA_REF.current.value.length;

			TEXTAREA_REF.current.focus();
			TEXTAREA_REF.current.setSelectionRange(LENGTH, LENGTH);
		}
	}, [isEditing]);

	if (!TODO_CONTEXT) {
		return <></>;
	}

	const { setEditingTask, deleteTask, todos, setTodos } = TODO_CONTEXT;

	return (
		<label className={styles['m-editing-task__container']}>
			<textarea
				ref={TEXTAREA_REF}
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
