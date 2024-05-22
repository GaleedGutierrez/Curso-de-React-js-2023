export function TodoButtonClearCompleted(): JSX.Element {
	return (
		<button
			type="button"
			className="text-hover text-active text-color-2"
			aria-label="Delete all completed tasks"
		>
			Clear Completed
		</button>
	);
}
