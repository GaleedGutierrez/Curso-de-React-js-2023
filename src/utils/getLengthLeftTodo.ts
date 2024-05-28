import { Task } from '@src/types/interfaces';

export const getLengthLeftTodo = (todos: Task[]): number =>
	todos.filter((todo) => !todo.completed).length;
