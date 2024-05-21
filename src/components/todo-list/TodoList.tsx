import './TodoList.css';

function TodoList({ children }: { children: React.ReactNode }): JSX.Element {
	return <ul className="m-todo-list">{children}</ul>;
}

export { TodoList };
