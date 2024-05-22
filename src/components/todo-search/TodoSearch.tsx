import styles from './TodoSearch.module.css';

function TodoSearch(): JSX.Element {
	return (
		<label className={styles['m-todo-search__container']}>
			<input
				type="text"
				placeholder="Create a new todo…"
				className={styles['m-todo-search__input']}
				onChange={(event) => {
					// eslint-disable-next-line no-console
					console.group('Add new task/search task');
					// eslint-disable-next-line no-console
					console.log(event);
					// eslint-disable-next-line no-console
					console.log(event.target);
					// eslint-disable-next-line no-console
					console.log(event.target.value);
					// eslint-disable-next-line no-console
					console.groupEnd();
				}}
			/>
		</label>
	);
}

export { TodoSearch };
