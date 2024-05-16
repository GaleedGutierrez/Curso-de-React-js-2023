function TodoItem(): JSX.Element {
	return (
		<li>
			<label>
				<input type="checkbox" />
				<span>Texto de ejemplo</span>
			</label>
			<button type="button">Eliminar</button>
		</li>
	);
}

export { TodoItem };
