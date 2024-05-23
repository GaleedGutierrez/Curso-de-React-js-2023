import './TodoItem.css';

interface Item {
	text: string;
	completed: boolean;
}

function TodoItem({ text, completed }: Item): JSX.Element {
	return (
		<li className="m-todo-item">
			<label className="m-todo-item__label">
				<div className="a-checkbox">
					<input
						type="checkbox"
						defaultChecked={completed}
						className="is-sr-only"
					/>
				</div>
				<span className="m-todo-item__task">
					{/* {completed ? <s>{text}</s> : text} */}
					{text}
				</span>
			</label>
			<label className="m-todo-item__edit-task">
				<input type="text" />
			</label>
			<button
				type="button"
				className="m-todo-item__close-button"
				aria-label="Delete task"
				onClick={(event) => {
					// eslint-disable-next-line no-console
					console.log('Click en eliminar');
					// eslint-disable-next-line no-console
					console.log(event);
					// eslint-disable-next-line no-console
					console.log(event.target);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1.8rem"
					height="1.8rem"
					className="a-icon"
				>
					<path
						fill="#494C6B"
						fillRule="evenodd"
						d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
					/>
				</svg>
			</button>
		</li>
	);
}

export { TodoItem };
