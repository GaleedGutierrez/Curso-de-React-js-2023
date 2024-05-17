function TodoCounter({
	total,
	completed,
}: {
	total: number;
	completed: number;
}): JSX.Element {
	return (
		<h1>
			Has completado {total} de {completed} TODOs
		</h1>
	);
}

export { TodoCounter };
