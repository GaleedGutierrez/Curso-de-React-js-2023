import { Task } from '@src/types/interfaces';

import { normalizeText } from './normalizeText';

export function searchTodos(todos: Task[], searchValue: string): Task[] {
	return todos.filter((todo) => {
		const TODO_TEXT = normalizeText(todo.text).toLocaleLowerCase();
		const TODO_SEARCH = normalizeText(searchValue).toLocaleLowerCase();

		return TODO_TEXT.includes(TODO_SEARCH);
	});
}
