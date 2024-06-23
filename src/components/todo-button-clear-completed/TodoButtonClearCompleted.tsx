import { TodoContext } from '@src/context/TodoContext';
import { useContext } from 'react';

export function TodoButtonClearCompleted(): JSX.Element {
	const TODO_CONTEXT = useContext(TodoContext);

	if (!TODO_CONTEXT) {
		return <></>;
	}

	const { todos, setTodos } = TODO_CONTEXT;

	return (
		<button
			type="button"
			className="text-hover text-active text-color-2"
			aria-label="Delete all completed tasks"
			onClick={() => {
				const NEW_TODOS = todos.filter((todo) => !todo.completed);

				setTodos(NEW_TODOS);
			}}
		>
			Clear Completed
		</button>
	);
}
