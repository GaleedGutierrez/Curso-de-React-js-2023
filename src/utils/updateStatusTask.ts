import { Task } from '@src/types/interfaces';

export interface updateStatusTaskParameters {
	todos: Task[];
	id: string;
	completed: boolean;
	setTodos: (newItem: Task[]) => void;
}

export function updateStatusTask({
	todos,
	id,
	completed,
	setTodos,
}: updateStatusTaskParameters): void {
	const INDEX_DELETED_TASK = todos.findIndex((todo) => todo.id === id);
	const NEW_TASKS = todos.toSpliced(INDEX_DELETED_TASK, 1, {
		...todos[INDEX_DELETED_TASK],
		completed,
	});

	setTodos(NEW_TASKS);
}
