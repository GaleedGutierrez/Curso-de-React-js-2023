import { Task } from '@src/types/interfaces';

export interface UpdateTaskParameters {
	todos: Task[];
	id: Task['id'];
	newText: string;
	setTodos: (newItem: Task[]) => void;
}

export function updateTask({
	todos,
	setTodos,
	id,
	newText,
}: UpdateTaskParameters): void {
	const INDEX_UPDATED_TASK = todos.findIndex((todo) => todo.id === id);
	const UPDATED_TASKS = todos;

	UPDATED_TASKS[INDEX_UPDATED_TASK].text = newText;
	setTodos(UPDATED_TASKS);
}
