import './TodoList.css';

export function TodoList({
	children,
	// searchValue,
}: {
	children: React.ReactNode;
	// searchValue: string;
}): JSX.Element {
	return <ul className="m-todo-list">{children}</ul>;
}
