import { Task } from '@src/types/interfaces';

export interface DeleteTaskParams {
	todos: Task[];
	setTodos: (newItem: Task[]) => void;
	id: string;
}

export function deleteTask({ todos, setTodos, id }: DeleteTaskParams): void {
	const INDEX_DELETED_TASK = todos.findIndex((todo) => todo.id === id);
	const NEW_TASKS = todos.toSpliced(INDEX_DELETED_TASK, 1);

	setTodos(NEW_TASKS);
}
