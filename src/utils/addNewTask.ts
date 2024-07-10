import { Task } from '@src/types/interfaces';

export interface AddNewTaskParameters {
	todos: Task[];
	text: string;
	setTodos: (newItem: Task[]) => void;
}

export function addNewTask({
	todos,
	text,
	setTodos,
}: AddNewTaskParameters): void {
	if (!text) {
		return;
	}

	const NEW_TASK: Task = {
		text,
		completed: false,
		id: globalThis.crypto.randomUUID(),
	};
	const NEW_TODOS = [...todos];

	NEW_TODOS.push(NEW_TASK);
	setTodos(NEW_TODOS);
}
